# Fateful Moment

React Native / Expo ile hazirlanmis, tarihsel karar senaryolari icin offline bir deneyim.

## Kurulum

    npm install
    npx expo start

Android emulator icin "npx expo start --android", iOS simulator icin "npx expo start --ios" kullanilabilir. Expo SDK 57, React Native 0.86 ve Expo Router kullanilmaktadir.

## Akis

- Welcome ekranindan giris veya hesap olusturma
- Dummy authentication ile senaryo arsivi
- Senaryo detayinda secim yapma
- Karar sonucu ve basit istatistik ozeti

Backend baglantisi yoktur; senaryolar src/services/mockData.ts icindeki dummy verilerden okunur.

## AI destekli gelistirme yaklasimi

Bu case boyunca Codex kullanilarak mevcut repo incelendi, Expo SDK 57 dokumani kontrol edildi, route yapisi ve mobil UI akisi iteratif olarak duzenlendi. AI ciktisi dogrudan kabul edilmek yerine TypeScript, Expo Router yapisi, responsive spacing ve platformlar arasi davranis acisindan kontrol edildi.

## Android APK

EAS ile preview APK uretmek icin:

    npx eas-cli@latest login
    npx eas-cli@latest build --platform android --profile preview

Build tamamlandiginda EAS'in verdigi artifact linkinden APK indirilebilir.

## Notlar

- Tum veriler local dummy data'dir.
- Uygulama koyu temali, HUD esintili Figma gorsel diliyle tasarlanmistir.
- iOS ekran kaydi icin iOS Simulator, Android ekran kaydi ve APK icin Android emulator veya fiziksel cihaz kullanilabilir.
