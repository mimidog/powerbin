#ifndef  _AUTHENTICATIONCLIENT_H
#define  _AUTHENTICATIONCLIENT_H
 
typedef  int (__stdcall * pfnRequestResult)(HANDLE handle, char * szProgram, char *inputParam,char *outputResult);                        
#define CLIENT_COM_DLL_LOAD_FAILED 100109    //客户端通讯动态库 加载失败 comclient.dll
#define CLIENT_COM_DLL_FUNC_FAILED 100110    //动态库获取函数入口地址失败

#ifdef AUTHCLIENT_EXPORTS
#define AUTHCLIENTAPI __declspec(dllexport)
#else
#define AUTHCLIENTAPI __declspec(dllimport)
#endif

#ifdef __cplusplus
extern "C" { 
#endif

	
//------------------------------------------------------------------------------
// 函数名称：UserLogin
// 功能描述：用户登陆 身份校验
// 入参说明： 
//      [in]  p_hHandle         用于通讯的句柄
//      [in]  p_pszInputParam   送入后台的参数，参数之间逗号","分隔，参数名和值用冒号":"分隔。 格式：F_OP_USER:8888,F_OP_ROLE:2,F_OP_SITE:234233,
//      [out] p_pszOutputResult  后台服务器返回的处理结果，其中p_pszOutputResult的空间大小要求大于2048字节。
// 返回说明：
//       返回 0, 函数成功返回。错误，返回错误代码。
AUTHCLIENTAPI int __stdcall UserLogin(HANDLE p_hHandle, char *inputParam, char *outputResult);


//------------------------------------------------------------------------------
// 函数名称：UserLogout
// 功能描述：用户登出,删除凭证；
// 入参说明：   
//      [in]  p_lHandle         用于通讯的句柄
//      [in]  p_pszInputParam   送入后台的参数，参数之间逗号","分隔，参数名和值用冒号":"分隔。 格式：F_OP_USER:8888,F_OP_ROLE:2,F_OP_SITE:234233,
//      [out] p_pszOutputResult  后台服务器返回的处理结果，其中p_pszOutputResult的空间大小要求大于2048字节。
// 返回说明：
//      返回 0, 函数成功返回。错误，返回错误代码。
AUTHCLIENTAPI int __stdcall UserLogout(HANDLE p_hHandle, char *inputParam, char *outputResult);


//------------------------------------------------------------------------------
// 函数名称：CheckUserAuthInfo
// 功能描述：用户密码验证（业务认证）
// 入参说明： 
//      [in]  p_lHandle         用于通讯的句柄
//      [in]  p_pszInputParam   送入后台的参数，参数之间逗号","分隔，参数名和值用冒号":"分隔。 格式：F_OP_USER:8888,F_OP_ROLE:2,F_OP_SITE:234233,
//      [out] p_pszOutputResult  后台服务器返回的处理结果，其中p_pszOutputResult的空间大小要求大于2048字节。
// 返回说明：
//      返回 0, 函数成功返回。错误，返回错误代码。
AUTHCLIENTAPI int __stdcall CheckUserAuthInfo(HANDLE p_hHandle,char *inputParam,char *outputResult);



//------------------------------------------------------------------------------
// 函数名称：CheckUserTicket
// 功能描述：凭证校验
// 入参说明： 
//      [in]  p_lHandle         用于通讯的句柄
//      [in]  p_pszInputParam   送入后台的参数，参数之间逗号","分隔，参数名和值用冒号":"分隔。 格式：F_OP_USER:8888,F_OP_ROLE:2,F_OP_SITE:234233,
//      [out] p_pszOutputResult  后台服务器返回的处理结果，其中p_pszOutputResult的空间大小要求大于2048字节。
// 返回说明：
//       返回 0, 函数成功返回。错误，返回错误代码。
AUTHCLIENTAPI int __stdcall CheckUserTicket(char *inputParam,char *outputResult);

//------------------------------------------------------------------------------
// 函数名称：GetCARandCode
// 功能描述：获取证书随机码
// 入参说明： 
//      [in]  p_lHandle         用于通讯的句柄
//      [in]  p_pszInputParam   送入后台的参数，参数之间逗号","分隔，参数名和值用冒号":"分隔。 格式：,
//      [out] p_pszUserCode     用户代码
//      [out] p_pszRandCode     证书随机码
// 返回说明：
//      返回 0, 函数成功返回。错误，返回错误代码。
//                               -1 票据为空
AUTHCLIENTAPI int __stdcall GetCARandCode(HANDLE p_hHandle, char *p_pszInputParam, char * p_pszUserCode, char *p_pszRandCode);

//创建一个基于KESBCLI.dll 的通讯句柄
AUTHCLIENTAPI int __stdcall Create_Auth_Handle(HANDLE &p_refhHandle);

//销毁一个基于KESBCLI.dll 的通讯句柄
AUTHCLIENTAPI int __stdcall Destroy_Auth_Handle(HANDLE &p_hHandle);
AUTHCLIENTAPI int __stdcall Test(void);

#ifdef __cplusplus
} 
#endif

#endif