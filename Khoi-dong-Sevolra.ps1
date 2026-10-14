$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$bun = Get-Command bun -ErrorAction SilentlyContinue
if (-not $bun) {
  $candidate = Join-Path $env:USERPROFILE '.bun\bin\bun.exe'
  if (-not (Test-Path $candidate)) { Invoke-RestMethod https://bun.sh/install.ps1 | Invoke-Expression }
  $bunPath = $candidate
} else { $bunPath = $bun.Source }
& $bunPath setup.mjs
if ($LASTEXITCODE -ne 0) { throw 'Không khởi động được Sevolra.' }
