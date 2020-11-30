<%@ page language="java" pageEncoding="UTF-8"%>
<%
String jsonString = "";//(String)request.getAttribute("jsonString");

jsonString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><response><![CDATA[{";
String message = "\"message\":{	    \"flag\": \"0\",	    \"prompt\": \"员工信息查询成功!\",	    \"rows\": \"1\",	    \"times\": \"103ms\"    }";
String configs = ",\"config\":{    \"id\": \"empManage\",    \"comp\": \"table\",    \"cols\": [        {            \"field\": \"emp_code\",            \"type\": \"param\",            \"name\": \"员工代码\"        },        {            \"field\": \"emp_name\",            \"type\": \"text\",            \"name\": \"员工姓名\"        }    ],    \"btns\": [        {            \"name\": \"新增\",            \"type\": \"add\",            \"service\": \"addEmp\"        },        {            \"name\": \"删除\",            \"type\": \"del\",            \"bex\": \"delEmp\"        },        {            \"name\": \"分组管理\",            \"type\": \"add\",            \"func\": \"empGroup\"        }    ]}";
String data = ",\"data\":[[{	\"id\":1,	\"text\":\"Folder111\",	\"iconCls\":\"icon-ok\",	\"children\":[{		\"id\":2,		\"text\":\"File1\",		\"checked\":true	},{		\"id\":3,		\"text\":\"Folder2\",		\"state\":\"open\",		\"children\":[{			\"id\":4,			\"text\":\"File2\",			\"attributes\":{				\"p1\":\"value1\",				\"p2\":\"value2\"			},			\"checked\":true,			\"iconCls\":\"icon-reload\"		},{			\"id\": 8,			\"text\":\"Folder3\",			\"state\":\"closed\",			\"children\":[{				\"id\":9,				\"text\":\"File31\"			},{				\"id\":10,				\"text\":\"File32\"			}]		}]	}]},{	\"text\":\"Languages\",	\"state\":\"closed\",	\"children\":[{		\"id\":\"j1\",		\"text\":\"Java\"	},{		\"id\":\"j2\",		\"text\":\"C#\"	}]}],[]]";

jsonString +=message;
jsonString +=configs;
jsonString +=data;
jsonString +="}]]></response>";

response.getWriter().write(jsonString);
%>