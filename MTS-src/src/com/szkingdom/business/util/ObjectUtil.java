package com.szkingdom.business.util;

import com.szkingdom.business.common.AtomError;
import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;


public class ObjectUtil {

    public static void chkNoNull(Object... objs) {
        boolean flag = true;
        if(objs != null) {
            for(int i = 0, len = objs.length; i < len; i++) {
                if(objs[i] == null) {
                    flag = false;
                    break;
                }
            }
        } else {
            flag = false;
        }
        if(!flag) {
            throw new AtomException(AtomError.PARAM_NOT_NULL_ATOM_ERROR_CODE, AtomError.PARAM_NOT_NULL_ATOM_ERROR_MSG,
                    FrameworkConstants.ATOM_LVL);
        }
    }
}
