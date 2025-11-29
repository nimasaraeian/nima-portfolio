# اسکریپت PowerShell برای کپی فایل‌ها به nimasaraeian.com

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "کپی فایل‌های AI Marketing UI" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# مسیر منبع
$sourcePath = "C:\Users\USER\Desktop\tensorflow-nima\web"

# مسیر مقصد - لطفاً مسیر پروژه nimasaraeian.com را وارد کنید
$destinationPath = Read-Host "مسیر پروژه nimasaraeian.com را وارد کنید (مثال: C:\Users\USER\Desktop\nimasaraeian.com)"

if (-not (Test-Path $destinationPath)) {
    Write-Host "❌ مسیر پیدا نشد!" -ForegroundColor Red
    Write-Host "لطفاً مسیر صحیح را وارد کنید." -ForegroundColor Yellow
    exit
}

# ایجاد پوشه ai-marketing در مقصد
$targetFolder = Join-Path $destinationPath "ai-marketing"

if (-not (Test-Path $targetFolder)) {
    New-Item -ItemType Directory -Path $targetFolder -Force | Out-Null
    Write-Host "✅ پوشه ai-marketing ایجاد شد" -ForegroundColor Green
}

# کپی فایل‌ها
Write-Host "`n📁 در حال کپی فایل‌ها..." -ForegroundColor Yellow

$files = @(
    @{Source = "index.html"; Dest = "index.html"},
    @{Source = "styles.css"; Dest = "styles.css"},
    @{Source = "app.js"; Dest = "app.js"}
)

foreach ($file in $files) {
    $sourceFile = Join-Path $sourcePath $file.Source
    $destFile = Join-Path $targetFolder $file.Dest
    
    if (Test-Path $sourceFile) {
        Copy-Item $sourceFile $destFile -Force
        Write-Host "  ✅ $($file.Source) → $($file.Dest)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $($file.Source) پیدا نشد!" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ کپی فایل‌ها کامل شد!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`n📂 مسیر فایل‌ها:" -ForegroundColor Yellow
Write-Host "  $targetFolder" -ForegroundColor White
Write-Host "`n🔗 URL دسترسی:" -ForegroundColor Yellow
Write-Host "  http://localhost/ai-marketing" -ForegroundColor Cyan
Write-Host "  یا" -ForegroundColor White
Write-Host "  https://nimasaraeian.com/ai-marketing" -ForegroundColor Cyan
Write-Host "`n📝 مراحل بعدی:" -ForegroundColor Yellow
Write-Host "  1. Navigation سایت را به‌روزرسانی کنید" -ForegroundColor White
Write-Host "  2. API URL را در app.js تنظیم کنید" -ForegroundColor White
Write-Host "  3. تست کنید!" -ForegroundColor White
Write-Host ""

