cmake_minimum_required(VERSION 3.4.1)
project(SuperpoweredPlayer)

# Set your source file
set(SOURCES
    PlayerModule.cpp
)

# Include the Superpowered headers
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/Superpowered)

# Add static libs (Superpowered .a files)
add_library(Superpowered-lib-armv7 STATIC IMPORTED)
set_target_properties(Superpowered-lib-armv7 PROPERTIES IMPORTED_LOCATION
    ${CMAKE_CURRENT_SOURCE_DIR}/libs/armeabi-v7a/libSuperpoweredAndroidarmeabi-v7a.a)

add_library(Superpowered-lib-arm64 STATIC IMPORTED)
set_target_properties(Superpowered-lib-arm64 PROPERTIES IMPORTED_LOCATION
    ${CMAKE_CURRENT_SOURCE_DIR}/libs/arm64-v8a/libSuperpoweredAndroidarm64-v8a.a)

# Create your native shared lib
add_library(player SHARED ${SOURCES})

# Link with Android log lib
find_library(log-lib log)

# Link Superpowered and log depending on ABI
if(${ANDROID_ABI} STREQUAL "armeabi-v7a")
    target_link_libraries(player
        ${log-lib}
        Superpowered-lib-armv7
    )
elseif(${ANDROID_ABI} STREQUAL "arm64-v8a")
    target_link_libraries(player
        ${log-lib}
        Superpowered-lib-arm64
    )
else()
    message(FATAL_ERROR "Unsupported ABI: ${ANDROID_ABI}")
endif()
