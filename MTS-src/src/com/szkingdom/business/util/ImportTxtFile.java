package com.szkingdom.business.util;

import com.szkingdom.frame.util.LogUtil;
import org.apache.commons.collections.map.HashedMap;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @file_desc: TXT文件导入类
 */
public class ImportTxtFile {
    /**
     * 读取带分隔符内容的TXT文件
     * @param filePath 想要读取的文件路径字符串（路径+文件名）
     * @param strColTitle:列标题字符串，如用逗号分隔
     * @param titleSeparator:列标题分隔符
     * @param titleSeparator:行内容分隔符，
     * @return 返回文件内容
     */
    public static List readTxtFileContentSeparator(String filePath,String strColTitle,String titleSeparator,String rowSeparator){

        if(!FileUtil.isFile(filePath)){
            LogUtil.error("文件路径或文件不存在!");
        }
        //存储所有内容
        List resList = new ArrayList();
        //标题数据组
        String[] colTitleArr= strColTitle.split(titleSeparator);
        try{
            //构造一个BufferedReader类来读取文件
            BufferedReader br = new BufferedReader(new FileReader(new File(filePath)));

            //行内容对象
            String lineRec = null;
            while((lineRec = br.readLine())!=null){//使用readLine方法，一次读一行
                String[] fieldConArr=lineRec.split(rowSeparator);
                //以Map形式存储txt行记录
                Map txtRowMap=new HashedMap();

                for(int i=0;i<colTitleArr.length;i++){
                    txtRowMap.put(colTitleArr[i].trim(),fieldConArr[i].trim());
                }
                //添加行记录到List集合中
                resList.add(txtRowMap);
            }
            br.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        return resList;
    }
}
