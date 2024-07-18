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
  func registerUser(userId: String){
    let result: String = mlsRegisterUser(userId: userId);
  }
  
  @objc
  func createGroup(groupId: String, registeredUserDataJsonString: String){
    let result: String = mlsCreateGroup(groupId: groupId, registeredUserDataJsonStr: registeredUserDataJsonString);
  }
  
  @objc
  func inviteMember(registeredUserDataJsonString: String, memberKeyPackageJsonString: String, mlsGroupJsonString: String){
    let result: String = mlsInviteMember(registeredUserDataJsonStr: registeredUserDataJsonString, memberKeyPackageJsonStr: memberKeyPackageJsonString, mlsGroupJsonStr: mlsGroupJsonString);
  }
  
  @objc
  func createGroupFromWelcome(serializedWelcomeMessageJsonString: String){
    let result: String = mlsCreateGroupFromWelcome(serializedWelcomeMessageJsonStr: serializedWelcomeMessageJsonString);
  }
  
  @objc
  func createApplicationMessage(registeredUserDataJsonString: String, mlsGroupJsonString: String, message: String){
    let result: String = mlsCreateApplicationMessage(registeredUserDataJsonStr: registeredUserDataJsonString, mlsGroupJsonStr: mlsGroupJsonString, message: message);
  }
  
  @objc
  func processApplicationMessage(mlsGroupJsonString: String, serializedApplicationMessageJsonString: String){
    let result: String = mlsProcessApplicationMessage(mlsGroupJsonStr: mlsGroupJsonString, serializedApplicationMessageJsonStr: serializedApplicationMessageJsonString);
  }
}
