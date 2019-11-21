
// maCliAuthDataDlg.cpp : 实现文件
//

#include "stdafx.h"
#include "maCliAuthData.h"
#include "maCliAuthDataDlg.h"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// 用于应用程序“关于”菜单项的 CAboutDlg 对话框

class CAboutDlg : public CDialogEx
{
public:
  CAboutDlg();

  // 对话框数据
  enum { IDD = IDD_ABOUTBOX };

protected:
  virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持

// 实现
protected:
  DECLARE_MESSAGE_MAP()
};

CAboutDlg::CAboutDlg() : CDialogEx(CAboutDlg::IDD)
{
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
  CDialogEx::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
END_MESSAGE_MAP()


// CMaCliAuthDataDlg 对话框

CMaCliAuthDataDlg::CMaCliAuthDataDlg(CWnd* pParent /*=NULL*/)
  : CDialogEx(CMaCliAuthDataDlg::IDD, pParent)
{
  m_hIcon = AfxGetApp()->LoadIcon(IDR_MAINFRAME);
}

void CMaCliAuthDataDlg::DoDataExchange(CDataExchange* pDX)
{
  CDialogEx::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP(CMaCliAuthDataDlg, CDialogEx)
  ON_WM_SYSCOMMAND()
  ON_WM_PAINT()
  ON_WM_QUERYDRAGICON()
  ON_BN_CLICKED(IDC_BUTTON1, &CMaCliAuthDataDlg::OnBnClickedButton1)
  ON_BN_CLICKED(IDC_BUTTON2, &CMaCliAuthDataDlg::OnBnClickedButton2)
  ON_BN_CLICKED(IDC_BUTTON3, &CMaCliAuthDataDlg::OnBnClickedButton3)
  ON_BN_CLICKED(IDC_BUTTON4, &CMaCliAuthDataDlg::OnBnClickedButton4)
  ON_BN_CLICKED(IDC_BUTTON5, &CMaCliAuthDataDlg::OnBnClickedButton5)
END_MESSAGE_MAP()

// CMaCliAuthDataDlg 消息处理程序

BOOL CMaCliAuthDataDlg::OnInitDialog()
{
  CDialogEx::OnInitDialog();

  // 将“关于...”菜单项添加到系统菜单中。

  // IDM_ABOUTBOX 必须在系统命令范围内。
  ASSERT((IDM_ABOUTBOX & 0xFFF0) == IDM_ABOUTBOX);
  ASSERT(IDM_ABOUTBOX < 0xF000);

  CMenu* pSysMenu = GetSystemMenu(FALSE);
  if (pSysMenu != NULL)
  {
    BOOL bNameValid;
    CString strAboutMenu;
    bNameValid = strAboutMenu.LoadString(IDS_ABOUTBOX);
    ASSERT(bNameValid);
    if (!strAboutMenu.IsEmpty())
    {
      pSysMenu->AppendMenu(MF_SEPARATOR);
      pSysMenu->AppendMenu(MF_STRING, IDM_ABOUTBOX, strAboutMenu);
    }
  }

  // 设置此对话框的图标。当应用程序主窗口不是对话框时，框架将自动
  //  执行此操作
  SetIcon(m_hIcon, TRUE);			// 设置大图标
  SetIcon(m_hIcon, FALSE);		// 设置小图标

  GetDlgItem(IDC_EDIT4)->SetWindowText(theApp.m_stUser.szUserCode);
  GetDlgItem(IDC_EDIT2)->SetWindowText(theApp.m_stUser.szUserAuthData);
  GetDlgItem(IDC_EDIT1)->SetWindowText(theApp.m_stUser.szCuacctCode);
  GetDlgItem(IDC_EDIT5)->SetWindowText(theApp.m_stUser.szAuthData);
  GetDlgItem(IDC_EDIT6)->SetWindowText(theApp.m_stUser.szCuacctCode);
  GetDlgItem(IDC_EDIT7)->SetWindowText(theApp.m_stUser.szAuthData);
  GetDlgItem(IDC_EDIT3)->SetWindowText(theApp.m_stUser.szAuthDataNew);
  ((CComboBox*)GetDlgItem(IDC_COMBO1))->ResetContent();
  ((CComboBox*)GetDlgItem(IDC_COMBO1))->InsertString(0, "0:股票");
  ((CComboBox*)GetDlgItem(IDC_COMBO1))->InsertString(1, "1:期权");
  ((CComboBox*)GetDlgItem(IDC_COMBO1))->InsertString(2, "2:期货");
  ((CComboBox*)GetDlgItem(IDC_COMBO1))->InsertString(3, "3:信用");
  ((CComboBox*)GetDlgItem(IDC_COMBO1))->SetCurSel(0);
  if (theApp.m_stUser.szCuacctType[0] >= '0' && theApp.m_stUser.szCuacctType[0] <= '3')
  {
    ((CComboBox*)GetDlgItem(IDC_COMBO1))->SetCurSel(theApp.m_stUser.szCuacctType[0] - '0');
  }
  else
  {
    ((CComboBox*)GetDlgItem(IDC_COMBO1))->SetCurSel(0);
  }
  ((CComboBox*)GetDlgItem(IDC_COMBO2))->ResetContent();
  ((CComboBox*)GetDlgItem(IDC_COMBO2))->InsertString(0, "0:人民币");
  ((CComboBox*)GetDlgItem(IDC_COMBO2))->InsertString(1, "1:港币");
  ((CComboBox*)GetDlgItem(IDC_COMBO2))->InsertString(2, "2:美元");
  ((CComboBox*)GetDlgItem(IDC_COMBO2))->SetCurSel(0);

  ((CComboBox*)GetDlgItem(IDC_COMBO3))->ResetContent();
  ((CComboBox*)GetDlgItem(IDC_COMBO3))->InsertString(0, "1:银行转证券");
  ((CComboBox*)GetDlgItem(IDC_COMBO3))->InsertString(1, "2:证券转银行");
  ((CComboBox*)GetDlgItem(IDC_COMBO3))->SetCurSel(0);

  ((CComboBox*)GetDlgItem(IDC_COMBO4))->ResetContent();
  ((CComboBox*)GetDlgItem(IDC_COMBO4))->InsertString(0, "0:不校验");
  ((CComboBox*)GetDlgItem(IDC_COMBO4))->InsertString(1, "1:校验");
  ((CComboBox*)GetDlgItem(IDC_COMBO4))->SetCurSel(1);

  ((CComboBox*)GetDlgItem(IDC_COMBO5))->ResetContent();
  ((CComboBox*)GetDlgItem(IDC_COMBO5))->InsertString(0, "0:人民币");
  ((CComboBox*)GetDlgItem(IDC_COMBO5))->InsertString(1, "1:港币");
  ((CComboBox*)GetDlgItem(IDC_COMBO5))->InsertString(2, "2:美元");
  ((CComboBox*)GetDlgItem(IDC_COMBO5))->SetCurSel(0);

  ((CComboBox*)GetDlgItem(IDC_COMBO6))->ResetContent();
  ((CComboBox*)GetDlgItem(IDC_COMBO6))->InsertString(0, "1:订单系统划入");
  ((CComboBox*)GetDlgItem(IDC_COMBO6))->InsertString(1, "2:订单系统划出");
  ((CComboBox*)GetDlgItem(IDC_COMBO6))->SetDroppedWidth(120);
  ((CComboBox*)GetDlgItem(IDC_COMBO6))->SetCurSel(0);

  GetDlgItem(IDC_BUTTON1)->EnableWindow(TRUE);
  GetDlgItem(IDC_BUTTON2)->EnableWindow(FALSE);
  GetDlgItem(IDC_BUTTON3)->EnableWindow(FALSE);
  GetDlgItem(IDC_BUTTON4)->EnableWindow(FALSE);
  GetDlgItem(IDC_BUTTON5)->EnableWindow(FALSE);

  CRect rc;
  GetClientRect(&rc);
  MoveWindow(100, 100, rc.Width(), rc.Height() + 20);

  ShowWindow(SW_NORMAL);

  return TRUE;  // 除非将焦点设置到控件，否则返回 TRUE
}

void CMaCliAuthDataDlg::OnSysCommand(UINT nID, LPARAM lParam)
{
  if ((nID & 0xFFF0) == IDM_ABOUTBOX)
  {
    CAboutDlg dlgAbout;
    dlgAbout.DoModal();
  }
  else
  {
    CDialogEx::OnSysCommand(nID, lParam);
  }
}

// 如果向对话框添加最小化按钮，则需要下面的代码
//  来绘制该图标。对于使用文档/视图模型的 MFC 应用程序，
//  这将由框架自动完成。

void CMaCliAuthDataDlg::OnPaint()
{
  if (IsIconic())
  {
    CPaintDC dc(this); // 用于绘制的设备上下文

    SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

    // 使图标在工作区矩形中居中
    int cxIcon = GetSystemMetrics(SM_CXICON);
    int cyIcon = GetSystemMetrics(SM_CYICON);
    CRect rect;
    GetClientRect(&rect);
    int x = (rect.Width() - cxIcon + 1) / 2;
    int y = (rect.Height() - cyIcon + 1) / 2;

    // 绘制图标
    dc.DrawIcon(x, y, m_hIcon);
  }
  else
  {
    CDialogEx::OnPaint();
  }
}

//当用户拖动最小化窗口时系统调用此函数取得光标
//显示。
HCURSOR CMaCliAuthDataDlg::OnQueryDragIcon()
{
  return static_cast<HCURSOR>(m_hIcon);
}

void CMaCliAuthDataDlg::OnBnClickedButton1()
{
  CString strAcct;
  GetDlgItem(IDC_EDIT4)->GetWindowText(strAcct);
  strncpy(theApp.m_stUser.szUserCode, strAcct, sizeof(theApp.m_stUser.szUserCode) - 1);
  CString strKey;
  GetDlgItem(IDC_EDIT2)->GetWindowText(strKey);
  strncpy(theApp.m_stUser.szUserAuthData, strKey, sizeof(theApp.m_stUser.szUserAuthData) - 1);
  if (theApp.ConnectCos() == 0)
  {
    AfxMessageBox("连接成功!", MB_ICONINFORMATION);
    GetDlgItem(IDC_BUTTON1)->EnableWindow(FALSE);
    GetDlgItem(IDC_BUTTON2)->EnableWindow(TRUE);
  }
  else
  {
    AfxMessageBox("连接失败!", MB_ICONWARNING);
  }
}

void CMaCliAuthDataDlg::OnBnClickedButton2()
{
  CString strAcct;
  GetDlgItem(IDC_EDIT1)->GetWindowText(strAcct);
  strncpy(theApp.m_stUser.szCuacctCode, strAcct, sizeof(theApp.m_stUser.szCuacctCode) - 1);
  CString strKey;
  GetDlgItem(IDC_EDIT5)->GetWindowText(strKey);
  strncpy(theApp.m_stUser.szAuthData, strKey, sizeof(theApp.m_stUser.szAuthData) - 1);
  theApp.m_stUser.szCuacctType[0] = ((CComboBox*)GetDlgItem(IDC_COMBO1))->GetCurSel() + '0';
  if (theApp.AcctLogin() == 0)
  {
    AfxMessageBox("登录成功!", MB_ICONINFORMATION);
    if (theApp.m_stUser.szCuacctType[0] == '0')
    {
      GetDlgItem(IDC_BUTTON3)->EnableWindow(TRUE);
    }
    if (theApp.m_stUser.szCuacctType[0] == '3')
    {
      GetDlgItem(IDC_BUTTON4)->EnableWindow(TRUE);
      GetDlgItem(IDC_BUTTON5)->EnableWindow(TRUE);
      GetDlgItem(IDC_EDIT8)->SetWindowText(theApp.m_stTranData.szTranAmt);
      GetDlgItem(IDC_EDIT9)->SetWindowText(theApp.m_stTranData.szFundPwd);
      GetDlgItem(IDC_EDIT10)->SetWindowText(theApp.m_stTranData.szBankCode);
      GetDlgItem(IDC_EDIT11)->SetWindowText(theApp.m_stTranData.szBankPwd);
      GetDlgItem(IDC_EDIT12)->SetWindowText(theApp.m_stTranData.szTrdPwd);
      GetDlgItem(IDC_EDIT13)->SetWindowText(theApp.m_stTranData.szTrdTermcode);
      GetDlgItem(IDC_EDIT14)->SetWindowText(theApp.m_stFundTran.szTranAmt);
      ((CComboBox*)GetDlgItem(IDC_COMBO2))->SetCurSel(theApp.m_stTranData.szCurrency[0] - '0');
      ((CComboBox*)GetDlgItem(IDC_COMBO3))->SetCurSel(theApp.m_stTranData.szTranType[0] - '0' == '1' ? '0' : '1');
      ((CComboBox*)GetDlgItem(IDC_COMBO4))->SetCurSel(theApp.m_stTranData.szPwdFlag[0] - '0');
      ((CComboBox*)GetDlgItem(IDC_COMBO5))->SetCurSel(theApp.m_stFundTran.szCurrency[0] - '0');
      ((CComboBox*)GetDlgItem(IDC_COMBO6))->SetCurSel(theApp.m_stFundTran.szDirect[0] - '0' == '1' ? '0' : '1');
    }
  }
  else
  {
    AfxMessageBox("登录失败!", MB_ICONWARNING);
  }
}

void CMaCliAuthDataDlg::OnBnClickedButton3()
{
  CString strAcct;
  GetDlgItem(IDC_EDIT6)->GetWindowText(strAcct);
  strncpy(theApp.m_stUser.szCuacctCode, strAcct, sizeof(theApp.m_stUser.szCuacctCode) - 1);
  CString strOld;
  GetDlgItem(IDC_EDIT7)->GetWindowText(strOld);
  strncpy(theApp.m_stUser.szAuthData, strOld, sizeof(theApp.m_stUser.szAuthData) - 1);
  CString strNew;
  GetDlgItem(IDC_EDIT3)->GetWindowText(strNew);
  strncpy(theApp.m_stUser.szAuthDataNew, strNew, sizeof(theApp.m_stUser.szAuthDataNew) - 1);
  if (theApp.AuthData() == 0)
  {
    AfxMessageBox("修改成功!", MB_ICONINFORMATION);
  }
  else
  {
    AfxMessageBox("修改失败!", MB_ICONWARNING);
  }
}

void CMaCliAuthDataDlg::OnBnClickedButton4()
{
  theApp.m_stTranData.szCurrency[0] = ((CComboBox*)GetDlgItem(IDC_COMBO2))->GetCurSel() + '0';
  theApp.m_stTranData.szTranType[0] = ((CComboBox*)GetDlgItem(IDC_COMBO3))->GetCurSel() + '0' == '0' ? '1' : '2';
  CString strTranAmt;
  GetDlgItem(IDC_EDIT8)->GetWindowText(strTranAmt);
  strncpy(theApp.m_stTranData.szTranAmt, strTranAmt, sizeof(theApp.m_stTranData.szTranAmt) - 1);
  CString strFundPwd;
  GetDlgItem(IDC_EDIT9)->GetWindowText(strFundPwd);
  strncpy(theApp.m_stTranData.szFundPwd, strFundPwd, sizeof(theApp.m_stTranData.szFundPwd) - 1);
  CString strBankCode;
  GetDlgItem(IDC_EDIT10)->GetWindowText(strBankCode);
  strncpy(theApp.m_stTranData.szBankCode, strBankCode, sizeof(theApp.m_stTranData.szBankCode) - 1);
  CString strBankPwd;
  GetDlgItem(IDC_EDIT11)->GetWindowText(strBankPwd);
  strncpy(theApp.m_stTranData.szBankPwd, strBankPwd, sizeof(theApp.m_stTranData.szBankPwd) - 1);
  theApp.m_stTranData.szPwdFlag[0] = ((CComboBox*)GetDlgItem(IDC_COMBO4))->GetCurSel() + '0';
  CString strTrdPwd;
  GetDlgItem(IDC_EDIT12)->GetWindowText(strTrdPwd);
  strncpy(theApp.m_stTranData.szTrdPwd, strTrdPwd, sizeof(theApp.m_stTranData.szTrdPwd) - 1);
  CString strTrdTeamcode;
  GetDlgItem(IDC_EDIT13)->GetWindowText(strTrdTeamcode);
  strncpy(theApp.m_stTranData.szTrdTermcode, strTrdTeamcode, sizeof(theApp.m_stTranData.szTrdTermcode) - 1);
  if (theApp.FislBankStkTransfer() == 0)
  {
    AfxMessageBox("银证转账成功!", MB_ICONINFORMATION);
  }
  else
  {
    AfxMessageBox("银证转账失败!", MB_ICONWARNING);
  }
}


void CMaCliAuthDataDlg::OnBnClickedButton5()
{
  theApp.m_stFundTran.szCurrency[0] = ((CComboBox*)GetDlgItem(IDC_COMBO5))->GetCurSel() + '0';
  theApp.m_stFundTran.szDirect[0] = ((CComboBox*)GetDlgItem(IDC_COMBO6))->GetCurSel() + '0' == '0' ? '1' : '2';;
  CString strTranAmt;
  GetDlgItem(IDC_EDIT14)->GetWindowText(strTranAmt);
  strncpy(theApp.m_stFundTran.szTranAmt, strTranAmt, sizeof(theApp.m_stFundTran.szTranAmt) - 1);
  if (theApp.FislFundTransfer() == 0)
  {
    AfxMessageBox("资金划拨成功!", MB_ICONINFORMATION);
  }
  else
  {
    AfxMessageBox("资金划拨失败!", MB_ICONWARNING);
  }
}
