package com.openmls_poc

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Callback
import uniffi.openmls_react_native_poc.mlsCreateApplicationMessage
import uniffi.openmls_react_native_poc.mlsCreateGroup
import uniffi.openmls_react_native_poc.mlsCreateGroupFromWelcome
import uniffi.openmls_react_native_poc.mlsCreateKeypackage
import uniffi.openmls_react_native_poc.mlsGetGroupMembers
import uniffi.openmls_react_native_poc.mlsInit
import uniffi.openmls_react_native_poc.mlsInviteMember
import uniffi.openmls_react_native_poc.mlsProcessApplicationMessage
import uniffi.openmls_react_native_poc.mlsProcessCommitMessage
import uniffi.openmls_react_native_poc.mlsRegisterUser

class OpenMLS(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "OpenMLS"

    @ReactMethod
    fun initMls() {
        val dir: String = this.reactApplicationContext.applicationInfo.dataDir
        val path = "$dir/mls_store.json"
        mlsInit(path)
    }

    @ReactMethod
    fun registerUser(params: ReadableMap, result: Callback) {
        val userId: String = params.getString("user_id")!!
        val res: String = mlsRegisterUser(userId)
        result(res)
    }

    @ReactMethod
    fun createKeyPackage(params: ReadableMap, result: Callback) {
        val registeredUserDataJsonString: String = params.getString("registered_user_data")!!
        val res: String = mlsCreateKeypackage(registeredUserDataJsonString)
        result(res)
    }

    @ReactMethod
    fun createGroup(params: ReadableMap) {
        val groupId: String = params.getString("group_id")!!
        val registeredUserDataJsonString: String = params.getString("registered_user_data")!!
        mlsCreateGroup(groupId, registeredUserDataJsonString)
    }

    @ReactMethod
    fun inviteMember(params: ReadableMap, result: Callback) {
        val memberKeyPackageJsonString: String = params.getString("member_key_package")!!
        val registeredUserDataJsonString: String = params.getString("registered_user_data")!!
        val groupId: String = params.getString("group_id")!!
        val res: String =
            mlsInviteMember(registeredUserDataJsonString, memberKeyPackageJsonString, groupId)
        result(res)
    }

    @ReactMethod
    fun createGroupFromWelcome(params: ReadableMap) {
        val serializedWelcomeMessageJsonString: String =
            params.getString("serialized_welcome_message")!!
        mlsCreateGroupFromWelcome(serializedWelcomeMessageJsonString)
    }

    @ReactMethod
    fun createApplicationMessage(params: ReadableMap, result: Callback) {
        val groupId: String = params.getString("group_id")!!
        val registeredUserDataJsonString: String = params.getString("registered_user_data")!!
        val message: String = params.getString("message")!!
        val res: String =
            mlsCreateApplicationMessage(registeredUserDataJsonString, message, groupId)
        result(res)
    }

    @ReactMethod
    fun processApplicationMessage(params: ReadableMap, result: Callback) {
        val groupId: String = params.getString("group_id")!!
        val serializedApplicationMessageJsonString: String =
            params.getString("serialized_application_message")!!
        val res: String =
            mlsProcessApplicationMessage(groupId, serializedApplicationMessageJsonString)
        result(res)
    }

    @ReactMethod
    fun processCommitMessage(params: ReadableMap) {
        val groupId: String = params.getString("group_id")!!
        val serializedCommitMessageJsonString: String =
            params.getString("serialized_commit_message")!!
        mlsProcessCommitMessage(groupId, serializedCommitMessageJsonString)
    }

    @ReactMethod
    fun getGroupMembers(params: ReadableMap, result: Callback) {
        val groupId: String = params.getString("group_id")!!
        val res: String = mlsGetGroupMembers(groupId)
        result(res)
    }

}