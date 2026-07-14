import portfolioProjects from '../src/data/portfolioProjects.data.json' with { type: 'json' }

const allowedStatuses = new Set(['draft', 'review', 'approved', 'published', 'archived'])
const allowedApprovals = new Set(['pending', 'approved', 'rejected'])
const allowedMediaTypes = new Set(['image', 'video', 'sequence', 'mockup', 'document'])

function isRemote(value) {
  return /^https?:\/\//i.test(value)
}

function isValidSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

const failures = []
const warnings = []
const slugs = new Set()

for (const project of portfolioProjects) {
  if (!project.id) {
    failures.push('Project without id.')
  }

  if (!project.slug || !isValidSlug(project.slug)) {
    failures.push(`Invalid slug: ${project.slug ?? '(missing)'}.`)
  } else if (slugs.has(project.slug)) {
    failures.push(`Duplicate slug: ${project.slug}.`)
  } else {
    slugs.add(project.slug)
  }

  if (!allowedStatuses.has(project.status)) {
    failures.push(`Invalid status in project "${project.slug}": ${project.status}.`)
  }

  if (project.status === 'published' && !project.clientPublicationApproved) {
    failures.push(`Published project "${project.slug}" lacks client publication approval.`)
  }

  if (project.status === 'published' && !project.seoApproved) {
    failures.push(`Published project "${project.slug}" lacks SEO approval.`)
  }

  if (project.status === 'published' && !project.copyApproved) {
    failures.push(`Published project "${project.slug}" lacks copy approval.`)
  }

  if (project.status === 'published' && !project.legalApproved) {
    failures.push(`Published project "${project.slug}" lacks legal approval.`)
  }

  for (const media of project.media ?? []) {
    if (!allowedMediaTypes.has(media.type)) {
      failures.push(`Project "${project.slug}" has invalid media type "${media.type}".`)
    }

    if (!allowedApprovals.has(media.approval)) {
      failures.push(`Project "${project.slug}" has invalid media approval "${media.approval}".`)
    }

    if (!media.src) {
      failures.push(`Project "${project.slug}" has media "${media.id}" without src.`)
    }

    if (media.src && isRemote(media.src)) {
      failures.push(`Project "${project.slug}" hotlinks remote media "${media.src}".`)
    }

    if (!media.width || !media.height) {
      failures.push(`Project "${project.slug}" has media "${media.id}" without dimensions.`)
    }

    if (!media.decorative && !media.alt) {
      failures.push(`Project "${project.slug}" has informative media "${media.id}" without alt text.`)
    }

    if (media.decorative && media.alt) {
      warnings.push(`Decorative media "${media.id}" in "${project.slug}" should not expose alt text.`)
    }

    if (project.status === 'published' && media.approval !== 'approved') {
      failures.push(`Published project "${project.slug}" uses non-approved media "${media.id}".`)
    }

    if (project.status === 'published' && !media.ownershipConfirmed) {
      failures.push(`Published project "${project.slug}" uses media "${media.id}" without ownership confirmation.`)
    }
  }
}

if (failures.length > 0) {
  console.error('Portfolio readiness check failed.\n')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Portfolio readiness check passed.')

if (warnings.length > 0) {
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`)
  }
}
