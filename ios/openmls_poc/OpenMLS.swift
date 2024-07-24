//
//  OpenMLS.swift
//  openmls_poc
//
//  Created by Chamoda on 16/07/2024.
//

import Foundation

@objc(OpenMLS)
class OpenMLS: NSObject{
  
  @objc
  func initMls(){
    let paths = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0] as NSString
    let getFilePath = paths.strings(byAppendingPaths: ["mls_key_store.json"])[0];
    mlsInit(keyStoreDirectory: getFilePath);
  }
  
  @objc
  func registerUser(_ params: NSDictionary, _ result: RCTResponseSenderBlock){
    let userId: String = params["user_id"] as! String
    let res: String = mlsRegisterUser(userId: userId);
    result([res]);
  }
  
  @objc
  func createGroup(_ params: NSDictionary, _ result: RCTResponseSenderBlock){
    let groupId: String = params["group_id"] as! String
    let registeredUserDataJsonString: String = params["registered_user_data"] as! String
    let res: String = mlsCreateGroup(groupId: groupId, registeredUserDataJsonStr: registeredUserDataJsonString);
    result([res]);
  }
  
  @objc
  func inviteMember(_ params: NSDictionary, _ result: RCTResponseSenderBlock){
    let memberKeyPackageJsonString: String = params["member_key_package"] as! String
    let registeredUserDataJsonString: String = params["registered_user_data"] as! String
    let mlsGroupJsonString: String = params["mls_group"] as! String
    let res: String = mlsInviteMember(registeredUserDataJsonStr: registeredUserDataJsonString, memberKeyPackageJsonStr: memberKeyPackageJsonString, mlsGroupJsonStr: mlsGroupJsonString);
    result([res]);
  }
  
  @objc
  func createGroupFromWelcome(_ params: NSDictionary, _ result: RCTResponseSenderBlock){
    let serializedWelcomeMessageJsonString: String = params["serialized_welcome_message"] as! String
    let res: String = mlsCreateGroupFromWelcome(serializedWelcomeMessageJsonStr: serializedWelcomeMessageJsonString);
    result([res]);
  }
  
  @objc
  func createApplicationMessage(_ params: NSDictionary, _ result: RCTResponseSenderBlock){
    let mlsGroupJsonString: String = params["mls_group"] as! String
    let registeredUserDataJsonString: String = params["registered_user_data"] as! String
    let message: String = params["message"] as! String
    let res: String = mlsCreateApplicationMessage(registeredUserDataJsonStr: registeredUserDataJsonString, mlsGroupJsonStr: mlsGroupJsonString, message: message);
    result([res]);
  }
  
  @objc
  func processApplicationMessage(_ params: NSDictionary, _ result: RCTResponseSenderBlock){
    let mlsGroupJsonString: String = params["mls_group"] as! String
    let serializedApplicationMessageJsonString: String = params["serialized_application_message"] as! String
    let res: String = mlsProcessApplicationMessage(mlsGroupJsonStr: mlsGroupJsonString, serializedApplicationMessageJsonStr: serializedApplicationMessageJsonString);
    result([res]);
  }
  
  @objc
  func processCommitMessage(_ params: NSDictionary, _ result: RCTResponseSenderBlock){
    let mlsGroupJsonString: String = params["mls_group"] as! String
    let serializedCommitMessageJsonString: String = params["serialized_commit_message"] as! String
    let res: String = mlsProcessCommitMessage(mlsGroupJsonStr: mlsGroupJsonString, serializedCommitMessageJsonStr: serializedCommitMessageJsonString)
    result([res]);
  }
  
  @objc
  func getGroupMembers(_ params: NSDictionary, _ result: RCTResponseSenderBlock){
    let mlsGroupJsonString: String = params["mls_group"] as! String
    let res: String = mlsGetGroupMembers(mlsGroupJsonStr: mlsGroupJsonString)
    result([res]);
  }
}
