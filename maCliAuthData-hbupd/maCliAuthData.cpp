
// maCliAuthData.cpp : 定义应用程序的类行为。
//

#include "stdafx.h"
#include "maCliAuthData.h"
#include "maCliAuthDataDlg.h"
#include "kbss_encrypt.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

#define CFG_FILE "maCliAuthData.ini"
#define APP_NAME "maCliAuthData"

#define SET_JINZHENG_PACKET_HEAD(szFunName, szMsgId, cFunType, cPktType, szSession, szIntOrg) \
  maCli_SetHdrValueC(m_hHandle, 'R', MACLI_HEAD_FID_MSG_TYPE); \
  maCli_SetHdrValueC(m_hHandle, cPktType, MACLI_HEAD_FID_PKT_TYPE); \
  maCli_SetHdrValueS(m_hHandle, "01", MACLI_HEAD_FID_PKT_VER); \
  maCli_SetHdrValueS(m_hHandle, szFunName, MACLI_HEAD_FID_FUNC_ID); \
  char szBufHdrTime[24]={0};\
  maCli_SetHdrValueS(m_hHandle, szBufHdrTime, MACLI_HEAD_FID_TIMESTAMP); \
  maCli_SetHdrValueC(m_hHandle, cFunType, MACLI_HEAD_FID_FUNC_TYPE); \
  maCli_GetUuid(m_hHandle, szMsgId, sizeof(szMsgId)); \
  maCli_SetHdrValueS(m_hHandle, szMsgId, MACLI_HEAD_FID_MSG_ID); \
  maCli_SetHdrValueS(m_hHandle, "0000", MACLI_HEAD_FID_DEST_NODE); \
  maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "8810");   \
  maCli_SetValueS(m_hHandle, "1", "8811");   \
  char szOpSite[32 + 1] = {0};  \
  sprintf(szOpSite, "1:");  \
  maCli_GetConnIpAddr(m_hHandle, szOpSite + 2, sizeof(szOpSite) - 3);  \
  maCli_SetValueS(m_hHandle, szOpSite, "8812"); \
  maCli_SetValueS(m_hHandle, m_stUser.szChannel, "8813");   \
  maCli_SetValueS(m_hHandle, szSession, "8814");                \
  maCli_SetValueS(m_hHandle, szFunName, "8815");                  \
  maCli_SetValueS(m_hHandle, szBufHdrTime, "8816");  \
  maCli_SetValueS(m_hHandle, szIntOrg, "8821"); \
  maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "8920");\
  maCli_SetValueC(m_hHandle, m_stUser.szCuacctType[0], "8826");

#define GET_JINZHENG_BIZ_MSG(hName, iMsgCode) \
  maCli_OpenTable(hName, 1); \
  maCli_ReadRow(hName, 1); \
  maCli_GetValueN(hName, &iMsgCode, "8817"); \

//读INI文件
int read_profile_string(const char *section, const char *key, char *value, int size, const char *default_value, const char *file);
//读INI文件
int read_profile_int(const char *section, const char *key, int default_value, const char *file);
// CmaCliAuthDataApp

BEGIN_MESSAGE_MAP(CMaCliAuthDataApp, CWinApp)
  ON_COMMAND(ID_HELP, &CWinApp::OnHelp)
END_MESSAGE_MAP()

// CmaCliAuthDataApp 构造

CMaCliAuthDataApp::CMaCliAuthDataApp()
{
  // 支持重新启动管理器
  m_dwRestartManagerSupportFlags = AFX_RESTART_MANAGER_SUPPORT_RESTART;
  memset((void*)&m_stUser, 0x00, sizeof(m_stUser));
  memset((void*)&m_stConn, 0x00, sizeof(m_stConn));
  m_hHandle = NULL;
}

CMaCliAuthDataApp::~CMaCliAuthDataApp()
{
  if (m_hHandle != NULL)
  {
    maCli_Exit(m_hHandle);
    m_hHandle = NULL;
  }
}

// 唯一的一个 CmaCliAuthDataApp 对象

CMaCliAuthDataApp theApp;

// CMaCliAuthDataApp 初始化

BOOL CMaCliAuthDataApp::InitInstance()
{
  // 如果一个运行在 Windows XP 上的应用程序清单指定要
  // 使用 ComCtl32.dll 版本 6 或更高版本来启用可视化方式，
  //则需要 InitCommonControlsEx()。否则，将无法创建窗口。
  INITCOMMONCONTROLSEX InitCtrls;
  InitCtrls.dwSize = sizeof(InitCtrls);
  // 将它设置为包括所有要在应用程序中使用的
  // 公共控件类。
  InitCtrls.dwICC = ICC_WIN95_CLASSES;
  InitCommonControlsEx(&InitCtrls);

  CWinApp::InitInstance();


  // 创建 shell 管理器，以防对话框包含
  // 任何 shell 树视图控件或 shell 列表视图控件。
  CShellManager *pShellManager = new CShellManager;

  // 标准初始化
  // 如果未使用这些功能并希望减小
  // 最终可执行文件的大小，则应移除下列
  // 不需要的特定初始化例程
  // 更改用于存储设置的注册表项
  // TODO: 应适当修改该字符串，
  // 例如修改为公司或组织名
  SetRegistryKey(_T("Kingdom"));

  GetParam();

  CMaCliAuthDataDlg dlg;
  m_pMainWnd = &dlg;
  INT_PTR nResponse = dlg.DoModal();
  if (nResponse == IDOK)
  {
    // TODO: 在此放置处理何时用
    //  “确定”来关闭对话框的代码
  }
  else if (nResponse == IDCANCEL)
  {
    // TODO: 在此放置处理何时用
    //  “取消”来关闭对话框的代码
  }

  // 删除上面创建的 shell 管理器。
  if (pShellManager != NULL)
  {
    delete pShellManager;
  }

  // 由于对话框已关闭，所以将返回 FALSE 以便退出应用程序，
  //  而不是启动应用程序的消息泵。
  return FALSE;
}

void CMaCliAuthDataApp::GetParam(void)
{
  read_profile_string(APP_NAME, "servername", m_stConn.szServerName, sizeof(m_stConn.szServerName), "server", CFG_FILE);
  m_stConn.nCommType = read_profile_int(APP_NAME, "commtype", COMM_TYPE_SOCKET, CFG_FILE);
  m_stConn.nProtocal = read_profile_int(APP_NAME, "protocal", 1, CFG_FILE);
  read_profile_string(APP_NAME, "serveraddr", m_stConn.szSvrAddress, sizeof(m_stConn.szSvrAddress), "127.0.0.1", CFG_FILE);
  m_stConn.nSvrPort = read_profile_int(APP_NAME, "serverport", 42000, CFG_FILE);
  read_profile_string(APP_NAME, "termcode", m_stConn.szTermCode, sizeof(m_stConn.szTermCode), "1B3098F9", CFG_FILE);
  read_profile_string(APP_NAME, "cuacct_code", m_stUser.szCuacctCode, 32, "", CFG_FILE);
  read_profile_string(APP_NAME, "cuacct_type", m_stUser.szCuacctType, 2, "1", CFG_FILE);
  read_profile_string(APP_NAME, "int_org", m_stUser.szIntOrg, 32, "0", CFG_FILE);
  read_profile_string(APP_NAME, "channel", m_stUser.szChannel, 12, "9", CFG_FILE);
  read_profile_string(APP_NAME, "auth_data", m_stUser.szAuthData, sizeof(m_stUser.szAuthData), "", CFG_FILE);
  read_profile_string(APP_NAME, "auth_data_new", m_stUser.szAuthDataNew, sizeof(m_stUser.szAuthDataNew), "", CFG_FILE);
  read_profile_string(APP_NAME, "user_code", m_stUser.szUserCode, sizeof(m_stUser.szUserCode), "", CFG_FILE);
  read_profile_string(APP_NAME, "user_auth_data", m_stUser.szUserAuthData, sizeof(m_stUser.szUserAuthData), "", CFG_FILE);
  read_profile_string(APP_NAME, "third_party", m_stUser.szThirdParty, sizeof(m_stUser.szThirdParty), "", CFG_FILE);

  //银证转账参数
  read_profile_string(APP_NAME, "currency", m_stTranData.szCurrency, 2, "0", CFG_FILE);
  read_profile_string(APP_NAME, "tran_type", m_stTranData.szTranType, 2, "", CFG_FILE);
  read_profile_string(APP_NAME, "tran_amt", m_stTranData.szTranAmt, sizeof(m_stTranData.szTranAmt), "", CFG_FILE);
  read_profile_string(APP_NAME, "fund_pwd", m_stTranData.szFundPwd, sizeof(m_stTranData.szFundPwd), "", CFG_FILE);
  read_profile_string(APP_NAME, "bank_code", m_stTranData.szBankCode, sizeof(m_stTranData.szBankCode), "", CFG_FILE);
  read_profile_string(APP_NAME, "bank_pwd", m_stTranData.szBankPwd, sizeof(m_stTranData.szBankPwd), "", CFG_FILE);
  read_profile_string(APP_NAME, "pwd_flag", m_stTranData.szPwdFlag, 2, "1", CFG_FILE);
  read_profile_string(APP_NAME, "trd_pwd", m_stTranData.szTrdPwd, sizeof(m_stTranData.szTrdPwd), "", CFG_FILE);
  read_profile_string(APP_NAME, "initiator", m_stTranData.szInitiator, 2, "1", CFG_FILE);
  read_profile_string(APP_NAME, "ext_org", m_stTranData.szExtOrg, sizeof(m_stTranData.szExtOrg), "", CFG_FILE);
  read_profile_string(APP_NAME, "trd_teamcode", m_stTranData.szTrdTermcode, sizeof(m_stTranData.szTrdTermcode), "", CFG_FILE);

  //资金划拨参数
  read_profile_string(APP_NAME, "ftran_currency", m_stFundTran.szCurrency, 2, "0", CFG_FILE);
  read_profile_string(APP_NAME, "tran_direct", m_stFundTran.szDirect, 2, "", CFG_FILE);
  read_profile_string(APP_NAME, "fund_tran_amt", m_stFundTran.szTranAmt, sizeof(m_stFundTran.szTranAmt), "", CFG_FILE);
}

int CMaCliAuthDataApp::ConnectCos(void)
{
  int iRetCode = 0;
  if (m_hHandle != NULL)
  {
    maCli_Exit(m_hHandle);
    m_hHandle = NULL;
  }
  maCli_Init(&m_hHandle);
  maCli_SetOptions(m_hHandle, MACLI_OPTION_CONNECT_PARAM, &m_stConn, sizeof(m_stConn));
  ST_MACLI_USERINFO stUserInfo = { 0 };
  strcpy(stUserInfo.szServerName, m_stConn.szServerName);
  strcpy(stUserInfo.szUserId, "KMAP00");
  strcpy(stUserInfo.szPassword, "888888");
  strcpy(stUserInfo.szAppId, "KD_FORTUNE_2");
  iRetCode = maCli_Open(m_hHandle, &stUserInfo);

  char szMsgId[32 + 1] = { 0 };
  maCli_BeginWrite(m_hHandle);
  SET_JINZHENG_PACKET_HEAD("10388750", szMsgId, 'T', 'B', m_stUser.szSessionId, m_stUser.szIntOrg);
  maCli_SetValueS(m_hHandle, m_stUser.szUserCode, "8080");
  char szAuthData[256] = { 0 };
  maCli_ComEncrypt(m_hHandle, szAuthData, sizeof(szAuthData), m_stUser.szUserAuthData, m_stUser.szCuacctCode);
  maCli_SetValueS(m_hHandle, szAuthData, "9084");
  maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "9086");
  maCli_SetValueS(m_hHandle, m_stUser.szThirdParty, "9000");
  maCli_EndWrite(m_hHandle);

  ST_MACLI_SYNCCALL stSyncCall = { 0 };
  strcpy(stSyncCall.szFuncId, "10388750");
  strcpy(stSyncCall.szMsgId, szMsgId);
  iRetCode = maCli_SyncCall(m_hHandle, &stSyncCall);
  if (iRetCode != 0) return -1;

  iRetCode = -1;
  GET_JINZHENG_BIZ_MSG(m_hHandle, iRetCode)
    if (iRetCode == 0)
    {
      maCli_OpenTable(m_hHandle, 2);
      int iRowCount = 0;
      maCli_GetRowCount(m_hHandle, &iRowCount);
      for (int iRowIndex = 0; iRowIndex < iRowCount; iRowIndex++)
      {
        maCli_ReadRow(m_hHandle, iRowIndex + 1);
        maCli_GetValueS(m_hHandle, m_stUser.szSessionId, sizeof(m_stUser.szSessionId), "8814");
        if (m_stUser.szSessionId[0] != 0x00) return 0;
      }
    }
  return -1;
}

int CMaCliAuthDataApp::AcctLogin(void)
{
  //if (m_hHandle == NULL || m_stUser.szSessionId[0] == 0x00) return -1;

  int iRetCode = 0;
  char szMsgId[32 + 1] = { 0 };
  char szApiVer[24] = { 0 };
  char szFuncId[8 + 1] = { 0 };
  char chAcctType = m_stUser.szCuacctType[0];
  char szCustCode[32] = { 0 };
  switch (chAcctType)
  {
  case '0':
    strcpy(szFuncId, "10301105");
    break;
  case '1':
    strcpy(szFuncId, "10314001");
    break;
  case '2':
    strcpy(szFuncId, "10330001");
    break;
  case '3':
    strcpy(szFuncId, "10301105");
    break;
  }
  maCli_BeginWrite(m_hHandle);
  maCli_GetVersion(m_hHandle, szApiVer, sizeof(szApiVer));
  SET_JINZHENG_PACKET_HEAD(szFuncId, szMsgId, 'T', 'B', m_stUser.szSessionId[0] != 0x00 ? m_stUser.szSessionId : szApiVer, m_stUser.szIntOrg);
  maCli_SetValueS(m_hHandle, "Z", "8987");
  if (chAcctType != '2') maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "9081");
  else maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "8920");
  maCli_SetValueC(m_hHandle, '0', "9082");
  maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "9086");
  maCli_SetValueC(m_hHandle, '0', "9083");
  char szAuthData[256 + 1] = { 0 };
  maCli_ComEncrypt(m_hHandle, szAuthData, sizeof(szAuthData), m_stUser.szAuthData, m_stUser.szCuacctCode);
  if (chAcctType != '2') maCli_SetValueS(m_hHandle, szAuthData, "9084");
  else maCli_SetValueS(m_hHandle, szAuthData, "9011");
  maCli_EndWrite(m_hHandle);

  ST_MACLI_SYNCCALL stSyncCall = { 0 };
  strcpy(stSyncCall.szFuncId, szFuncId);
  strcpy(stSyncCall.szMsgId, szMsgId);
  iRetCode = maCli_SyncCall(m_hHandle, &stSyncCall);
  if (iRetCode != 0) return -1;

  iRetCode = -1;
  GET_JINZHENG_BIZ_MSG(m_hHandle, iRetCode);
  if (iRetCode == 0)
  {
    maCli_OpenTable(m_hHandle, 2);
    int iRowCount = 0;
    iRetCode = maCli_GetRowCount(m_hHandle, &iRowCount);
    if (iRowCount > 0)
    {
      maCli_ReadRow(m_hHandle, 1);
      maCli_GetValueS(m_hHandle, m_stTranData.szCustCode, sizeof(m_stTranData.szCustCode), "8902");
      return 0;
    }
  }
  return -1;
}

int CMaCliAuthDataApp::AuthData(void)
{
  if (m_hHandle == NULL) return -1;

  int iRetCode = 0;
  char szMsgId[32 + 1] = { 0 };

  maCli_BeginWrite(m_hHandle);
  SET_JINZHENG_PACKET_HEAD("10304013", szMsgId, 'T', 'B', m_stUser.szSessionId, m_stUser.szIntOrg);
  maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "8902");
  char szAuthData[256] = { 0 };
  maCli_ComEncrypt(m_hHandle, szAuthData, sizeof(szAuthData), m_stUser.szAuthDataNew, m_stUser.szCuacctCode);
  maCli_SetValueS(m_hHandle, szAuthData, "9083");
  char szSrcAuthData[256] = { 0 };
  maCli_ComEncrypt(m_hHandle, szSrcAuthData, sizeof(szSrcAuthData), m_stUser.szAuthData, m_stUser.szCuacctCode);
  maCli_SetValueS(m_hHandle, szSrcAuthData, "9084");
  maCli_EndWrite(m_hHandle);

  ST_MACLI_SYNCCALL stSyncCall = { 0 };
  strcpy(stSyncCall.szFuncId, "10304013");
  strcpy(stSyncCall.szMsgId, szMsgId);

  iRetCode = maCli_SyncCall(m_hHandle, &stSyncCall);
  if (iRetCode != 0) return -1;

  iRetCode = -1;
  GET_JINZHENG_BIZ_MSG(m_hHandle, iRetCode)
    if (iRetCode == 0)
    {
      maCli_OpenTable(m_hHandle, 1);
      int iRowCount = 0;
      maCli_GetRowCount(m_hHandle, &iRowCount);
      if (iRowCount > 0) return 0;
    }
  return -1;
}

int CMaCliAuthDataApp::FislBankStkTransfer(void)
{
  if (m_hHandle == NULL) return -1;

  int iRetCode = 0;
  char szMsgId[32 + 1] = { 0 };

  maCli_BeginWrite(m_hHandle);
  SET_JINZHENG_PACKET_HEAD("10305036", szMsgId, 'T', 'B', m_stUser.szSessionId, m_stUser.szIntOrg);
  maCli_SetValueS(m_hHandle, "", "8810"); //临时操作员代码传空
  maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "8920"); //资金账号
  maCli_SetValueC(m_hHandle, m_stTranData.szCurrency[0], "15"); //货币代码
  maCli_SetValueC(m_hHandle, m_stTranData.szTranType[0], "9081"); //转账类型
  maCli_SetValueS(m_hHandle, m_stTranData.szTranAmt, "8984"); //转账金额
  char szFundPwd[128] = { 0 };
  kbss_encrypt1(szFundPwd, sizeof(szFundPwd), m_stTranData.szFundPwd, m_stUser.szCuacctCode, 1);
  maCli_SetValueS(m_hHandle, szFundPwd, "9082"); //资金密码
  maCli_SetValueS(m_hHandle, m_stTranData.szBankCode, "9098"); //银行代码
  maCli_SetValueS(m_hHandle, m_stTranData.szBankPwd, "8914"); //银行密码
  maCli_SetValueC(m_hHandle, m_stTranData.szPwdFlag[0], "8861"); //资金密码校验标识
  char szTrdPwd[128] = { 0 };
  kbss_encrypt1(szTrdPwd, sizeof(szTrdPwd), m_stTranData.szTrdPwd, m_stTranData.szCustCode, 1);
  maCli_SetValueS(m_hHandle, szTrdPwd, "9080"); //交易密码
  maCli_SetValueC(m_hHandle, '1', "9083"); //发起方默认券商
  maCli_SetValueS(m_hHandle, m_stTranData.szExtOrg, "9084"); //外部机构
  maCli_SetValueS(m_hHandle, m_stTranData.szTrdTermcode, "9085"); //交易终端特征码

  maCli_EndWrite(m_hHandle);

  ST_MACLI_SYNCCALL stSyncCall = { 0 };
  strcpy(stSyncCall.szFuncId, "10305036");
  strcpy(stSyncCall.szMsgId, szMsgId);

  iRetCode = maCli_SyncCall(m_hHandle, &stSyncCall);
  if (iRetCode != 0) return -1;

  iRetCode = -1;
  GET_JINZHENG_BIZ_MSG(m_hHandle, iRetCode)
    if (iRetCode == 0)
    {
      maCli_OpenTable(m_hHandle, 1);
      int iRowCount = 0;
      maCli_GetRowCount(m_hHandle, &iRowCount);
      if (iRowCount > 0) return 0;
    }
  return -1;
}

int CMaCliAuthDataApp::FislFundTransfer(void)
{
  if (m_hHandle == NULL) return -1;

  int iRetCode = 0;
  char szMsgId[32 + 1] = { 0 };

  maCli_BeginWrite(m_hHandle);
  SET_JINZHENG_PACKET_HEAD("10305015", szMsgId, 'T', 'B', m_stUser.szSessionId, m_stUser.szIntOrg);
  maCli_SetValueS(m_hHandle, "", "8810"); //临时操作员代码传空
  maCli_SetValueS(m_hHandle, m_stUser.szCuacctCode, "8920");
  maCli_SetValueC(m_hHandle, m_stFundTran.szCurrency[0], "15");
  maCli_SetValueC(m_hHandle, m_stFundTran.szDirect[0], "9081");
  maCli_SetValueS(m_hHandle, m_stFundTran.szTranAmt, "8983");

  maCli_EndWrite(m_hHandle);

  ST_MACLI_SYNCCALL stSyncCall = { 0 };
  strcpy(stSyncCall.szFuncId, "10305015");
  strcpy(stSyncCall.szMsgId, szMsgId);

  iRetCode = maCli_SyncCall(m_hHandle, &stSyncCall);
  if (iRetCode != 0) return -1;

  iRetCode = -1;
  GET_JINZHENG_BIZ_MSG(m_hHandle, iRetCode)
    if (iRetCode == 0)
    {
      maCli_OpenTable(m_hHandle, 1);
      int iRowCount = 0;
      maCli_GetRowCount(m_hHandle, &iRowCount);
      if (iRowCount > 0) return 0;
    }
  return -1;
}

#define MAX_FILE_SIZE 1024*16
#define LEFT_BRACE '['
#define RIGHT_BRACE ']'

static int load_ini_file(const char *file, char *buf, int *file_size)
{
  FILE *in = NULL;
  int i = 0;
  *file_size = 0;
  if (file == NULL || buf == NULL)
  {
    return -1;
  }

  in = fopen(file, "r");
  if (NULL == in) {
    return 0;
  }

  buf[i] = fgetc(in);

  //load initialization file
  while (buf[i] != (char)EOF) {
    i++;
    //	assert( i < MAX_FILE_SIZE ); //file too big, you can redefine MAX_FILE_SIZE to fit the big file 
    if (i < MAX_FILE_SIZE)
    {
      buf[i] = fgetc(in);
    }
  }

  buf[i] = '\0';
  *file_size = i;

  fclose(in);
  return i;
}
static int newline(char c)
{
  return ('\n' == c || '\r' == c) ? 1 : 0;
}
static int end_of_string(char c)
{
  return '\0' == c ? 1 : 0;
}
static int left_barce(char c)
{
  return LEFT_BRACE == c ? 1 : 0;
}
static int isright_brace(char c)
{
  return RIGHT_BRACE == c ? 1 : 0;
}
static int parse_file(const char *section, const char *key, const char *buf, int *sec_s, int *sec_e, int *key_s, int *key_e, int *value_s, int *value_e)
{
  const char *p = buf;
  int i = 0;
  if (buf == NULL || section == NULL || key == NULL)
  {
    return -1;
  }

  *sec_e = *sec_s = *key_e = *key_s = *value_s = *value_e = -1;

  while (!end_of_string(p[i])) {
    //find the section
    if ((0 == i || newline(p[i - 1])) && left_barce(p[i]))
    {
      int section_start = i + 1;

      //find the ']'
      do {
        i++;
      } while (!isright_brace(p[i]) && !end_of_string(p[i]));

      if (0 == strncmp(p + section_start, section, i - section_start)) {
        int newline_start = 0;

        i++;

        //Skip over space char after ']'
        while (isspace(p[i])) {
          i++;
        }

        //find the section
        *sec_s = section_start;
        *sec_e = i;

        while (!(newline(p[i - 1]) && left_barce(p[i]))
          && !end_of_string(p[i])) {
          int j = 0;
          //get a new line
          newline_start = i;

          while (!newline(p[i]) && !end_of_string(p[i])) {
            i++;
          }

          //now i  is equal to end of the line
          j = newline_start;

          if (';' != p[j]) //skip over comment
          {
            while (j < i && p[j] != '=') {
              j++;
              if ('=' == p[j]) {
                //	if(strncmp(key,p+newline_start,j-newline_start)==0)
                {
                  int iLength = j - newline_start;
                  if ((int)strlen(key) > iLength)
                  {
                    iLength = strlen(key);
                  }
                  if (strncmp(key, p + newline_start, iLength) == 0)
                  {
                    //find the key ok
                    *key_s = newline_start;
                    *key_e = j - 1;

                    *value_s = j + 1;
                    *value_e = i;

                    return 1;
                  }
                }
              }
            }
          }

          i++;
        }
      }
    }
    else
    {
      i++;
    }
  }
  return 0;
}

/*! \fn read_profile_string( const char *section, const char *key,char *value,
                  int size, const char *default_value, const char *file)
 * \brief read string in initialization file

 * \param[in] 	section					name of the section containing the key name
 * \param[in] 	key						name of the key pairs to value
 * \param[in] 	value						size of result's buffer
 * \param[in] 	size						path of the initialization file
 * \param[in] 	default_value				default value of result
 * \param[in] 	file						path of the initialization file
 * \return 		return 1 : read success; \n 0 : read fail
 * \author 		郭玉臻
 * \date 			2009-6-19
*/
int read_profile_string(const char *section, const char *key, char *value, int size, const char *default_value, const char *file)
{
  char buf[MAX_FILE_SIZE] = { 0 };
  int file_size;
  int sec_s, sec_e, key_s, key_e, value_s, value_e;
  if (section == NULL || key == NULL || value == NULL || file == NULL)
  {
    return -1;
  }
  if (!load_ini_file(file, buf, &file_size))
  {
    if (default_value != NULL)
    {
      strncpy(value, default_value, size);
    }
    return 0;
  }

  if (!parse_file(section, key, buf, &sec_s, &sec_e, &key_s, &key_e, &value_s, &value_e))
  {
    if (default_value != NULL)
    {
      strncpy(value, default_value, size);
    }
    return 0; //not find the key
  }
  else
  {
    int cpcount = value_e - value_s;

    if (size - 1 < cpcount)
    {
      cpcount = size - 1;
    }

    memset(value, 0, size);
    memcpy(value, buf + value_s, cpcount);
    value[cpcount] = '\0';

    return 1;
  }
}

/*! \fn read_profile_int( const char *section, const char *key,int default_value,
                const char *file)
 * \brief read int value in initialization file

 * \param[in] 	section					name of the section containing the key name
 * \param[in] 	key						name of the key pairs to value
 * \param[in] 	default_value				default value of result
 * \param[in] 	file						path of the initialization file
 * \return 		profile int value,if read fail, return default value
 * \author 		郭玉臻
 * \date 			2009-6-19
*/
int read_profile_int(const char *section, const char *key, int default_value, const char *file)
{
  char value[32] = { 0 };
  if (!read_profile_string(section, key, value, sizeof(value), NULL, file))
  {
    return default_value;
  }
  else
  {
    return atoi(value);
  }
}
