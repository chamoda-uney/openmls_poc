//
//  OpenMLS.m
//  openmls_poc
//
//  Created by Chamoda on 16/07/2024.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(OpenMLS, NSObject)

RCT_EXTERN_METHOD(initMls)
RCT_EXTERN_METHOD(registerUser: (NSDictionary *)params: (RCTResponseSenderBlock)result)
RCT_EXTERN_METHOD(createGroup: (NSDictionary *)params: (RCTResponseSenderBlock)result)
RCT_EXTERN_METHOD(inviteMember: (NSDictionary *)params: (RCTResponseSenderBlock)result)
RCT_EXTERN_METHOD(createGroupFromWelcome: (NSDictionary *)params: (RCTResponseSenderBlock)result)
RCT_EXTERN_METHOD(createApplicationMessage: (NSDictionary *)params: (RCTResponseSenderBlock)result)
RCT_EXTERN_METHOD(processApplicationMessage: (NSDictionary *)params: (RCTResponseSenderBlock)result)
RCT_EXTERN_METHOD(processCommitMessage: (NSDictionary *)params: (RCTResponseSenderBlock)result)
RCT_EXTERN_METHOD(getGroupMembers: (NSDictionary *)params: (RCTResponseSenderBlock)result)


@end
