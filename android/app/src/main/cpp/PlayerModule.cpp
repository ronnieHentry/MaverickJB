#include <jni.h>
#include <string>
#include "SuperpoweredSimple.h"

extern "C" JNIEXPORT jstring JNICALL
Java_com_maverickjb_PlayerModule_processAudioNative(JNIEnv* env, jobject /* this */) {
    std::string hello = "Hello from Superpowered!";
    return env->NewStringUTF(hello.c_str());
}

