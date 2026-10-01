$pages = @(
  'src\app\pages\work\work.page.scss',
  'src\app\pages\services\services.page.scss',
  'src\app\pages\scale\scale.page.scss',
  'src\app\pages\about\about.page.scss',
  'src\app\pages\contact\contact.page.scss',
  'src\app\pages\home\home.page.scss'
)
$replacements = @(
  @{ Old = 'color: var(--color-navy-dark)'; New = 'color: var(--text-primary)' },
  @{ Old = 'color: var(--color-slate-700)'; New = 'color: var(--text-secondary)' },
  @{ Old = 'color: var(--color-slate-600)'; New = 'color: var(--text-muted)' },
  @{ Old = 'color: var(--color-slate-500)'; New = 'color: var(--text-muted)' },
  @{ Old = 'background: #ffffff'; New = 'background: var(--surface-card)' },
  @{ Old = "background: #fff;"; New = 'background: var(--surface-card);' },
  @{ Old = 'border: 1px solid var(--color-slate-200)'; New = 'border: 1px solid var(--border-default)' },
  @{ Old = 'border-bottom: 1px solid var(--color-slate-200)'; New = 'border-bottom: 1px solid var(--border-default)' },
  @{ Old = 'border-top: 1px solid var(--color-slate-200)'; New = 'border-top: 1px solid var(--border-default)' },
  @{ Old = 'border-color: var(--color-slate-200)'; New = 'border-color: var(--border-default)' }
)
foreach ($page in $pages) {
  $content = Get-Content $page -Raw
  foreach ($r in $replacements) {
    $content = $content -replace [regex]::Escape($r.Old), $r.New
  }
  Set-Content $page -Value $content -NoNewline
}
Write-Host 'Done replacing color tokens in all page SCSS files'
