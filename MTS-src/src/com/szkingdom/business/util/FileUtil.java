package com.szkingdom.business.util;
import com.szkingdom.business.common.AtomError;
import com.szkingdom.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import org.apache.commons.lang.StringUtils;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;


public class FileUtil {

    /**
     * 判断对应文件或文件夹是否存在
     * @param sPath
     * @return
     */
    public static boolean isExists(String sPath){
        File file = new File(sPath);
        // 判断目录或文件是否存在
        if (!file.exists()) {  // 不存在返回 false
            return false;
        }else {
            return true;
        }
    }
    /**
     * 判断文件是否存在
     * @param path
     * @return
     * @author jinlw 2016-09-30
     */
    public static boolean isFile(String path) {
        return new File(path).isFile();
    }

    /**
     * 根据路径删除指定的目录或文件，无论存在与否
     * @param sPath  要删除的目录或文件
     * @return 删除成功返回 true，否则返回 false。
     */
    public static boolean deleteFolderOrFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // 判断目录或文件是否存在
        if (!file.exists()) {  // 不存在返回 false
            return flag;
        } else {
            // 判断是否为文件
            if (file.isFile()) {  // 为文件时调用删除文件方法
                return deleteFile(sPath);
            } else {  // 为目录时调用删除目录方法
                return deleteDirectory(sPath);
            }
        }
    }

    /**
     * 删除单个文件
     * @param   sPath    被删除文件的文件名
     * @return 单个文件删除成功返回true，否则返回false
     */
    public static boolean deleteFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }

    /**
     * 删除目录（文件夹）以及目录下的文件
     * @param   sPath 被删除目录的文件路径
     * @return  目录删除成功返回true，否则返回false
     */
    public static boolean deleteDirectory(String sPath) {
        //如果sPath不以文件分隔符结尾，自动添加文件分隔符
        if (!sPath.endsWith(File.separator)) {
            sPath = sPath + File.separator;
        }
        File dirFile = new File(sPath);
        //如果dir对应的文件不存在，或者不是一个目录，则退出
        if (!dirFile.exists() || !dirFile.isDirectory()) {
            return false;
        }
        boolean flag = true;
        //删除文件夹下的所有文件(包括子目录)
        File[] files = dirFile.listFiles();
        for (int i = 0; i < files.length; i++) {
            //删除子文件
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag) break;
            } //删除子目录
            else {
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag) break;
            }
        }
        if (!flag) return false;
        //删除当前目录
        if (dirFile.delete()) {
            return true;
        } else {
            return false;
        }
    }
    public static String getFileUploadBasePath() {
        return getFileUploadBasePath("false", "false");
    }

    /**
     * 获取系统文件上传路径根目录
     * @param isLocal
     * @param isImage
     * @return
     */
    public static String getFileUploadBasePath(String isLocal, String isImage) {
        return getFileUploadBasePath(isLocal, isImage, null, null);
    }
    /**
     * 获取系统文件上传路径根目录
     * @param isLocal
     * @param isImage
     * @param imgResPath
     * @param fileResPath
     * @return
     * @author jinlw 2016-10-10
     */
    public static String getFileUploadBasePath(String isLocal, String isImage, String imgResPath, String fileResPath) {
        String resourcePath = "",
                uploadPath = "";
        if("true".equals(isLocal)) {
            uploadPath = getWebRootPath() + "upload";
        } else {
            if("true".equals(isImage)) {
                resourcePath = imgResPath;
                if(StringUtils.isEmpty(resourcePath)) {
                    resourcePath = (String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("image.resource.path");
                }
            } else {
                resourcePath = fileResPath;
                if(StringUtils.isEmpty(resourcePath)) {
                    resourcePath = (String)CustomizedPropertyPlaceholderConfigurer.getContextProperty("file.resource.path");
                }
            }
        }
        if(StringUtils.isNotEmpty(resourcePath)) {
            uploadPath = resourcePath + File.separator;
        } else {
            uploadPath = getWebRootPath() + "upload" + File.separator;
        }
        return uploadPath;
    }

    /**
     * webRoot路径下的路径拼装
     *
     * @param relativePath webRoot下的相对路径
     * @return
     */
    public static String getPath(String relativePath) {
        String root = FileUtil.class.getResource("/").getPath().replace("WEB-INF/classes/", relativePath);
        return root;
    }
    /**
     * 获取项目WebRoot路径
     * @return
     * @author jinlw 2016-10-10
     */
    public static String getWebRootPath() {
        try {
            String path = URLDecoder.decode(FileUtil.class.getResource("/").getPath().toString(), "UTF-8");
            int len = path.toLowerCase().replaceAll("webroot\\S*$", "").length() + "webroot".length();
            return path.substring(0, len) + File.separator;
        } catch (UnsupportedEncodingException e) {
            throw new AtomException(AtomError.GET_WEBROOT_URL_FAIL_ATOM_ERROR_CODE, AtomError.GET_WEBROOT_URL_FAIL_ATOM_ERROR_MSG,
                    FrameworkConstants.ATOM_LVL);
        }
    }
}
