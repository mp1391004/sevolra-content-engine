@echo off
cd /d "%~dp0"
where bun >nul 2>nul
if %errorlevel% equ 0 (
  bun setup.mjs
) else (
  if not exist "%USERPROFILE%\.bun\bin\bun.exe" powershell -NoProfile -Command "Invoke-Expression (Invoke-RestMethod https://bun.sh/install.ps1)"
  "%USERPROFILE%\.bun\bin\bun.exe" setup.mjs
)
pause
