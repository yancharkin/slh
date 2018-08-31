export function BufferLoader(context, urls, callback) {
    this.context = context;
    this.urls = urls;
    this.onload = callback;
    this.buffers = {};
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(key, url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
        loader.context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    console.error("error decoding file data: " + url);
                    return;
                }
                loader.buffers[key] = buffer;
                if (++loader.loadCount == Object.keys(loader.urls).length)
                    loader.onload(loader.buffers);
            },
        function(error) {
            console.error("decodeAudioData error", error);
        }
        );
    };

    request.onerror = function() {
    console.error("BufferLoader: XHR error");
    };

    request.send();
};

BufferLoader.prototype.load = function() {
    Object.keys(this.urls).forEach(key => {
        this.loadBuffer(key, this.urls[key]);
    });
};

