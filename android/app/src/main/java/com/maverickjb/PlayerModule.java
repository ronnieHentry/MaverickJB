package com.maverickjb;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class PlayerModule extends ReactContextBaseJavaModule {

    static {
        System.loadLibrary("player"); // This loads your C++ `libplayer.so`
    }

    public PlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PlayerModule";
    }

    // Exposed to JS
    @ReactMethod
    public void processAudio(Promise promise) {
        String result = processAudioNative();
        promise.resolve(result);
    }

    // Native method implemented in C++
    private native String processAudioNative();
}
