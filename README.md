# RX-8

Фэнтези ретро компьютер, наподобие chip-8.

Буква R в названии обозначает Retro. Буква X служит символом для обозначения архитектуры, как например в x86. Цифра 8 указывает на 8-битную архитектуру.

Создан на базе https://taniarascia.github.io/chip8/

# Шаблон

Шаблон для проектов:

- typescript,
- vite,
- eslint,
- prettier,
- electron.

# Начало работы

Создаем новую папку для проекта

```
mkdir my_project
cd my_project
```

Клонируем репозиторий

```
git clone https://github.com/fwmakc/ts-vite-project.git .
```

Устанавливаем

```
yarn
```

# Быстрый запуск

В режиме разработки

```
yarn dev
```

# Запуск под десктоп

В режиме разработки

```
yarn electron:dev
```

## Билд под десктопные устройства

Выполняем предварительную сборку

```
yarn build
```

Собираем приложение под десктоп

```
yarn electron:make
```

Готовое приложение будет лежать в каталоге

```
out/template-vite-ts-win32-x64
```

## Подготовка к сборке под мобильные устройства

Сборку делаем через capacitor. Полностью все происходит в несколько шагов.

Для настройки отредактируйте файл

```
capacitor.config.ts
```

Добавляем мобильное устройство. Это нужно сделать один раз после развертывания проекта.

```
yarn cap add android
```

Созданный каталог android содержит множество настроек приложения, которые хотелось бы сохранить в репозитории. Но он также содержит много временных файлов и копии проекта и поэтому получается слишком большим.

Мы создали другой каталог app, где вы можете хранить все настройки и ресурсы для сборки.

Перед сборкой вам просто нужно скопировать его содержимое

```
cp -rf app/android/* android/app/src/main
```

или

```
xcopy app\android\* android\app\src\main /E /H /C /I /Y
```

Выполняем предварительную сборку

```
yarn build
```

Копируем собранный проект для следующего этапа

```
yarn cap copy
```

## Билд под мобильные устройства

Для дальнейшей сборки под android лучше всего работать в контейнере nodejs из проекта https://github.com/isengine/server.git

Перейдем в каталог

```
cd android
```

Билд в режиме дебаг:

```
./gradlew assembleDebug
```

Готовое приложение будет лежать в каталоге

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Билд в продакшн:

```
./gradlew assembleRelease
```

Готовое приложение теперь будет лежать в каталоге

```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

Дальнейшие действия лучше выполнять из корневого каталога проекта

```
cd ..
```

Создаем ключ для подписи

```
keytool -genkey -v -keystore MY_RELEASE_KEY.jks -keyalg RSA -keysize 2048 -validity 10000 -alias MY_KEY_ALIAS

```

Запишите созданные пароли и alias, так как они понадобятся вам в дальнейшем.

Создаем копию приложения

```
cp android/app/build/outputs/apk/release/app-release-unsigned.apk android/app/build/outputs/apk/release/app-release.apk
```

Подписываем приложение

```
apksigner sign --ks MY_RELEASE_KEY.jks --ks-key-alias MY_KEY_ALIAS --ks-pass pass:YOUR_KEYSTORE_PASSWORD --key-pass pass:YOUR_KEY_PASSWORD android/app/build/outputs/apk/release/app-release.apk
```

Можно проверить подпись

```
apksigner verify android/app/build/outputs/apk/release/app-release.apk
```

Если APK подписан правильно, вы не увидите никаких ошибок.

# Лицензия

Лицензия MIT, 2025
