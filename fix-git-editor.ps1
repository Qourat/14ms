# Fix Git Editor Configuration for Windows/Cursor
# Run this script to fix Git editor issues in Cursor

Write-Host "Fixing Git editor configuration..." -ForegroundColor Green

# Set Git global editor to notepad
git config --global core.editor "notepad.exe"

# Set environment variables
[System.Environment]::SetEnvironmentVariable("GIT_EDITOR", "notepad.exe", "User")
[System.Environment]::SetEnvironmentVariable("EDITOR", "notepad.exe", "User")

# Verify configuration
Write-Host "`nCurrent Git editor configuration:" -ForegroundColor Yellow
git config --global --get core.editor

Write-Host "`nEnvironment variables set:" -ForegroundColor Yellow
Write-Host "GIT_EDITOR = $([System.Environment]::GetEnvironmentVariable('GIT_EDITOR', 'User'))"
Write-Host "EDITOR = $([System.Environment]::GetEnvironmentVariable('EDITOR', 'User'))"

Write-Host "`n✅ Git editor configuration updated!" -ForegroundColor Green
Write-Host "`nNote: You may need to restart Cursor for changes to take effect." -ForegroundColor Cyan
Write-Host "If the issue persists, check Cursor settings:" -ForegroundColor Cyan
Write-Host "  1. Open Cursor Settings (Ctrl+,)" -ForegroundColor Cyan
Write-Host "  2. Search for 'git editor'" -ForegroundColor Cyan
Write-Host "  3. Disable 'Git: Use Editor As Commit Input'" -ForegroundColor Cyan

