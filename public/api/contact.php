<?php
declare(strict_types=1);

const SUBEROS_CONTACT_TO = 'info@suberos.com';
const SUBEROS_CONTACT_FROM = 'info@suberos.com';
const SUBEROS_CONTACT_RATE_LIMIT_WINDOW = 60;
const SUBEROS_CONTACT_RATE_LIMIT_MAX_REQUESTS = 3;
const SUBEROS_CONTACT_MIN_SUBMIT_DELAY_MS = 1500;
const SUBEROS_CONTACT_MAX_BODY_BYTES = 12000;

const SUBEROS_ALLOWED_KEYS = [
    'name',
    'email',
    'service',
    'message',
    'company',
    'phone',
    'budget',
    'timeline',
    'website',
    'contactPreference',
    'honey',
    'startedAt',
];

const SUBEROS_ALLOWED_SERVICES = [
    'photography' => 'Fotografia profesional',
    'branding' => 'Branding e identidad visual',
    'graphic-design' => 'Diseno grafico',
    'print-production' => 'Impresion y produccion',
    'web-design-development' => 'Diseno y desarrollo web',
    'not-sure' => 'No estoy seguro',
];

const SUBEROS_ALLOWED_PREFERENCES = ['email', 'phone', 'either'];

function suberos_send_json(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function suberos_request_id(): string
{
    try {
        return bin2hex(random_bytes(8));
    } catch (Throwable $exception) {
        return str_replace('.', '', uniqid('suberos', true));
    }
}

function suberos_clean_line(string $value, int $maxLength): string
{
    $value = trim(str_replace(["\r", "\n", "\t"], ' ', $value));
    $value = preg_replace('/\s+/u', ' ', $value) ?? '';
    return mb_substr($value, 0, $maxLength);
}

function suberos_clean_textarea(string $value, int $maxLength): string
{
    $value = str_replace("\r\n", "\n", $value);
    $value = str_replace("\r", "\n", $value);
    $value = trim($value);
    $value = preg_replace("/\n{3,}/u", "\n\n", $value) ?? '';
    return mb_substr($value, 0, $maxLength);
}

function suberos_field_error(string $message): array
{
    return ['ok' => false, 'reason' => 'validation', 'message' => $message];
}

function suberos_rate_limit_path(string $clientIp): string
{
    $baseDir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'suberos-contact-rate-limit';

    if (!is_dir($baseDir)) {
        @mkdir($baseDir, 0700, true);
    }

    return $baseDir . DIRECTORY_SEPARATOR . hash('sha256', $clientIp ?: 'unknown') . '.json';
}

function suberos_is_rate_limited(string $clientIp): bool
{
    $path = suberos_rate_limit_path($clientIp);
    $now = time();
    $windowStart = $now - SUBEROS_CONTACT_RATE_LIMIT_WINDOW;
    $entries = [];

    if (is_file($path)) {
        $decoded = json_decode((string) file_get_contents($path), true);
        if (is_array($decoded)) {
            foreach ($decoded as $timestamp) {
                if (is_int($timestamp) && $timestamp >= $windowStart) {
                    $entries[] = $timestamp;
                }
            }
        }
    }

    if (count($entries) >= SUBEROS_CONTACT_RATE_LIMIT_MAX_REQUESTS) {
        file_put_contents($path, json_encode($entries), LOCK_EX);
        return true;
    }

    $entries[] = $now;
    file_put_contents($path, json_encode($entries), LOCK_EX);
    return false;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Allow: POST, OPTIONS');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    suberos_send_json(405, [
        'ok' => false,
        'reason' => 'error',
        'message' => 'Metodo no permitido.',
    ]);
}

$requestId = suberos_request_id();
$rawBody = file_get_contents('php://input');

if (!is_string($rawBody) || $rawBody === '') {
    suberos_send_json(400, suberos_field_error('No hemos podido procesar la solicitud.'));
}

if (strlen($rawBody) > SUBEROS_CONTACT_MAX_BODY_BYTES) {
    suberos_send_json(413, suberos_field_error('El mensaje es demasiado largo para procesarlo ahora mismo.'));
}

$decoded = json_decode($rawBody, true);

if (!is_array($decoded)) {
    suberos_send_json(400, suberos_field_error('No hemos podido procesar la solicitud.'));
}

$unknownKeys = array_diff(array_keys($decoded), SUBEROS_ALLOWED_KEYS);
if ($unknownKeys !== []) {
    suberos_send_json(422, [
        'ok' => false,
        'reason' => 'validation',
        'message' => 'El formulario incluye campos no admitidos.',
        'fieldErrors' => ['form' => 'El formulario incluye campos no admitidos.'],
    ]);
}

$name = suberos_clean_line((string) ($decoded['name'] ?? ''), 80);
$email = strtolower(suberos_clean_line((string) ($decoded['email'] ?? ''), 160));
$service = (string) ($decoded['service'] ?? '');
$message = suberos_clean_textarea((string) ($decoded['message'] ?? ''), 3000);
$company = suberos_clean_line((string) ($decoded['company'] ?? ''), 120);
$phone = suberos_clean_line((string) ($decoded['phone'] ?? ''), 20);
$budget = suberos_clean_line((string) ($decoded['budget'] ?? ''), 80);
$timeline = suberos_clean_line((string) ($decoded['timeline'] ?? ''), 80);
$website = suberos_clean_line((string) ($decoded['website'] ?? ''), 160);
$contactPreference = (string) ($decoded['contactPreference'] ?? '');
$honey = suberos_clean_line((string) ($decoded['honey'] ?? ''), 120);
$startedAt = (int) ($decoded['startedAt'] ?? 0);

$fieldErrors = [];

if ($name === '' || mb_strlen($name) < 2) {
    $fieldErrors['name'] = 'Introduce tu nombre.';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fieldErrors['email'] = 'Introduce un correo electronico valido.';
}

if (!array_key_exists($service, SUBEROS_ALLOWED_SERVICES)) {
    $fieldErrors['service'] = 'Selecciona el tipo de proyecto o servicio.';
}

if ($message === '' || mb_strlen($message) < 24) {
    $fieldErrors['message'] = 'Describe brevemente el proyecto.';
}

if ($phone !== '' && !preg_match('/^[+()0-9\s.-]{6,20}$/', $phone)) {
    $fieldErrors['phone'] = 'Introduce un telefono valido o dejalo vacio.';
}

if ($website !== '' && !filter_var($website, FILTER_VALIDATE_URL)) {
    $fieldErrors['website'] = 'Introduce una URL valida o dejala vacia.';
}

if ($contactPreference !== '' && !in_array($contactPreference, SUBEROS_ALLOWED_PREFERENCES, true)) {
    $fieldErrors['contactPreference'] = 'Selecciona una preferencia valida o deja el campo sin elegir.';
}

if ($honey !== '') {
    $fieldErrors['form'] = 'No hemos podido procesar el envio.';
}

$nowMs = (int) round(microtime(true) * 1000);
if ($startedAt <= 0 || ($nowMs - $startedAt) < SUBEROS_CONTACT_MIN_SUBMIT_DELAY_MS) {
    $fieldErrors['form'] = 'Espera un instante y vuelve a intentarlo.';
}

if ($fieldErrors !== []) {
    suberos_send_json(422, [
        'ok' => false,
        'reason' => 'validation',
        'message' => $fieldErrors['form'] ?? 'Revisa los campos marcados para poder enviar la solicitud.',
        'fieldErrors' => $fieldErrors,
    ]);
}

$clientIp = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (suberos_is_rate_limited($clientIp)) {
    suberos_send_json(429, [
        'ok' => false,
        'reason' => 'rate-limited',
        'message' => 'Hemos detenido temporalmente nuevos envios. Espera un momento o usa correo o telefono si tu consulta es urgente.',
        'retryAfterSeconds' => SUBEROS_CONTACT_RATE_LIMIT_WINDOW,
    ]);
}

$subject = sprintf('SUBEROS contacto: %s - %s', $service, $name);
$bodyLines = [
    'Nueva solicitud de contacto SUBEROS',
    '',
    'Request ID: ' . $requestId,
    'Nombre: ' . $name,
    'Email: ' . $email,
    'Servicio: ' . SUBEROS_ALLOWED_SERVICES[$service],
    'Empresa o marca: ' . ($company !== '' ? $company : 'No indicado'),
    'Telefono: ' . ($phone !== '' ? $phone : 'No indicado'),
    'Presupuesto: ' . ($budget !== '' ? $budget : 'No indicado'),
    'Plazo: ' . ($timeline !== '' ? $timeline : 'No indicado'),
    'Web actual: ' . ($website !== '' ? $website : 'No indicada'),
    'Preferencia de contacto: ' . ($contactPreference !== '' ? $contactPreference : 'Sin preferencia'),
    'IP: ' . $clientIp,
    'User-Agent: ' . (string) ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'),
    '',
    'Mensaje:',
    $message,
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: SUBEROS <' . SUBEROS_CONTACT_FROM . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Suberos-Request-Id: ' . $requestId,
];

$sent = @mail(
    SUBEROS_CONTACT_TO,
    $subject,
    implode("\r\n", $bodyLines),
    implode("\r\n", $headers),
    '-f' . SUBEROS_CONTACT_FROM
);

if (!$sent) {
    error_log('[suberos-contact] requestId=' . $requestId . ' send_failed');
    suberos_send_json(503, [
        'ok' => false,
        'reason' => 'error',
        'message' => 'No hemos podido completar el envio ahora mismo. Usa correo o telefono si tu consulta es urgente.',
    ]);
}

suberos_send_json(200, [
    'ok' => true,
    'deliveryMode' => 'production',
    'message' => 'Hemos recibido tu solicitud y responderemos desde info@suberos.com lo antes posible.',
    'requestId' => $requestId,
]);
