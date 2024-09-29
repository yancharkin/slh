const cacheName = 'SLH-v1';

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Install");
    event.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching everything");
            try {
                await cache.addAll(filesList);
            } catch (error) {
                console.error(`[Service Worker] ${error}`);
                for (let f of filesList) {
                    try {
                        //console.log(`[Service Worker] Caching ${f}`);
                        await cache.add(f);
                    } catch (error) {
                        console.error(`[Service Worker] ${error}:`, f);
                    }
                }
            }
        })(),
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return;
                    }
                    console.warn(`[Service Worker] Cache removed: ${key}`);
                    return caches.delete(key);
                }),
            );
        }),
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const cachedResponse = await caches.match(event.request,{ignoreMethod:true});
            if (cachedResponse) {
                console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
                return cachedResponse;
            }
            try {
                const networkResponse = await fetch(event.request);
                if (networkResponse.ok) {
                    const cache = await caches.open(cacheName);
                    console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            } catch (error) {
                console.error(`[Service Worker] ${error}`, event.request.url);
                return Response.error();
            }
        })(),
    );
});

const filesList = [
    "/slh/",
    "/slh/index.html",
    "/slh/assets/fonts/bravura-text.woff",
    "/slh/js/setup.js",
    "/slh/css/default.css",
    "/slh/js/main.js",
    "/slh/js/dependencies.js",
    "/slh/js/Base64binary.js",
    "/slh/js/Base64.js",
    "/slh/js/MIDI.min.js",
    "/slh/assets/images/dark.svg",
    "/slh/assets/images/dice.svg",
    "/slh/assets/images/en.svg",
    "/slh/assets/images/es.svg",
    "/slh/assets/images/ka.svg",
    "/slh/assets/images/icon.png",
    "/slh/assets/images/icon.svg",
    "/slh/assets/images/light.svg",
    "/slh/assets/images/play-black.svg",
    "/slh/assets/images/play-white.svg",
    "/slh/assets/images/up.svg",
    "/slh/assets/images/down.svg",
    "/slh/assets/images/ru.svg",
    "/slh/assets/images/uk.svg",
    "/slh/assets/samples/drums/hat-c.wav",
    "/slh/assets/samples/drums/ride.wav",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/A0.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/A1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/A2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/A3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/A4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/A5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/A6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/A7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Ab1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Ab2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Ab3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Ab4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Ab5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Ab6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Ab7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/B0.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/B1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/B2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/B3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/B4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/B5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/B6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/B7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Bb0.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Bb1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Bb2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Bb3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Bb4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Bb5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Bb6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Bb7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/C1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/C2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/C3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/C4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/C5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/C6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/C7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/C8.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/D1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/D2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/D3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/D4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/D5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/D6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/D7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Db1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Db2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Db3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Db4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Db5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Db6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Db7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Db8.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/E1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/E2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/E3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/E4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/E5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/E6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/E7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Eb1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Eb2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Eb3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Eb4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Eb5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Eb6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Eb7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/F1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/F2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/F3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/F4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/F5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/F6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/F7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/G1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/G2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/G3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/G4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/G5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/G6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/G7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Gb1.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Gb2.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Gb3.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Gb4.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Gb5.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Gb6.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3/Gb7.mp3",
    "/slh/assets/soundfonts/acoustic_grand_piano-mp3.js",
    "/slh/assets/soundfonts/acoustic_grand_piano-ogg.js"
]
