package com.szkingdom.business.util;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.DateUtil;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @desc 解析xlsx工具类
 */
public class XlsxUtil {

    public static List readXlsx(String filePath){
        //判断文件是否存在
        File file = new File(filePath);
        if(!file.exists()){
            throw new AtomException(AtomError.PLEASE_WAIT_FILE_UPLOAD_ATOM_ERROR_CODE,AtomError.PLEASE_WAIT_FILE_UPLOAD_ATOM_ERROR_MSG, FrameworkConstants.ATOM_LVL);
        }
        //存储读取结果
        List<Map> fileInfo = new ArrayList<Map>();

        Workbook wb = null;
        int columnNum = 0;
        try{
            //将文件输入流转为xlsx对象
            InputStream input = new FileInputStream(filePath);
            wb = WorkbookFactory.create(input);
        }catch (FileNotFoundException e){
            e.printStackTrace();
        }catch (InvalidFormatException e){   //poi内异常
            e.printStackTrace();
        }catch (IOException e){
            e.printStackTrace();
        }
        //获取第一页
        Sheet sheet = wb.getSheetAt(0);
        if(sheet.getRow(0)!=null){
            //获取列数
            columnNum = sheet.getRow(0).getLastCellNum()-sheet.getRow(0).getFirstCellNum();
        }

        if(columnNum > 0){
            //存储表结构字段
            String[] field = new String[columnNum];
            Row fieldRow = sheet.getRow(0);
            for(int j=0;j<columnNum;j++){
                Cell fieldCell = fieldRow.getCell(j);
                String tempStr = fieldCell.getStringCellValue().trim();
                if(tempStr.indexOf("（") != -1){
                    field[j] = tempStr.substring(0,tempStr.indexOf("（"));
                } else if(tempStr.indexOf("(") != -1){
                    field[j] = tempStr.substring(0,tempStr.indexOf("("));
                } else {
                    field[j] = tempStr;
                }
            }

            for(Row row:sheet){
                //存储每行数据
                Map singleRow = new HashMap();
                int n = 0;
                //每行列数据循环
                for(int i=0;i<columnNum;i++){
                    Cell cell = row.getCell(i, Row.CREATE_NULL_AS_BLANK);
                    switch(cell.getCellType()){
                        case Cell.CELL_TYPE_BLANK:
                            singleRow.put(field[i],"");
                            break;
                        case Cell.CELL_TYPE_BOOLEAN:
                            singleRow.put(field[i],Boolean.toString(cell.getBooleanCellValue()));
                            break;
                        case Cell.CELL_TYPE_NUMERIC:   //数字分为日期与非日期
                            if(DateUtil.isCellDateFormatted(cell)){
                                singleRow.put(field[i],String.valueOf(cell.getDateCellValue()));
                            }else{
                                cell.setCellType(Cell.CELL_TYPE_STRING);  //非日期将单元格内容改为String类型
                                String temp = cell.getStringCellValue();
                                //包含小数点以Double读取,不包含以String读取
                                if(temp.indexOf(".")>-1){
                                    singleRow.put(field[i],String.valueOf(new Double(temp)));
                                }else{
                                    singleRow.put(field[i],temp.trim());
                                }
                            }
                            break;
                        case Cell.CELL_TYPE_STRING:
                            singleRow.put(field[i],cell.getStringCellValue().trim());
                            break;
                        case Cell.CELL_TYPE_ERROR:
                            singleRow.put(field[i],"");
                            break;
                        case Cell.CELL_TYPE_FORMULA:
                            cell.setCellType(Cell.CELL_TYPE_STRING);
                            if(cell.getStringCellValue()!=null){
                                singleRow.put(field[i],cell.getStringCellValue().replaceAll("#N/A","").trim());
                            }
                            break;
                        default:
                            singleRow.put(field[i],"");
                            break;
                    }
                }
                //如果第一个字段无值,则该行为空记录
                if("".equals(singleRow.get(field[0]))){
                        continue;
                }
                fileInfo.add(singleRow);
            }
        }
        return fileInfo;
    }

}
