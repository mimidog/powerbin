package com.szkingdom.business.common;

import com.szkingdom.frame.config.FrameworkConstants;
import com.szkingdom.frame.exception.AtomException;
import org.apache.commons.lang.ObjectUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CheckParam {
    //任一参数为空,报异常
	@SuppressWarnings("unchecked")
	public static final void anyNull(Map par, String... keys) {
		final StringBuffer msg = new StringBuffer();
		boolean isHasNull = false;
		if(par == null || par.isEmpty()){
			throw new AtomException(-13, "入参不能为空!",
					FrameworkConstants.ATOM_LVL);
		}

		for (int i = 0, len = keys.length; i < len; i++) {
			final String key = ObjectUtils.toString(keys[i]).trim();
			if (key.isEmpty()) {
				continue;
			}
			final String val = ObjectUtils.toString(par.get(key));
            if(val.isEmpty()){
            	isHasNull = true;
            	msg.append(key + "、");
            }
		}
		if (isHasNull) {
			throw new AtomException(-14,  "[" + msg.substring(0, (msg.length()-1)) + "]不能为空",
					FrameworkConstants.ATOM_LVL);
		}
	}
	
	//所以参数为空,报异常
	@SuppressWarnings("unchecked")
	public static void notAllNull(Map par, String... keys){
		StringBuffer msg = new StringBuffer();
		boolean isAllNull = true;
		if(par == null || par.isEmpty()){
			throw new AtomException(-15,  "入参不能为空!",
					FrameworkConstants.ATOM_LVL);  
		}
		
		for (int i = 0, len = keys.length; i < len; i++) {
			String key = ObjectUtils.toString(keys[i]).trim();
			if (key.isEmpty()) {
				continue;
			}
			String val = ObjectUtils.toString(par.get(key));
			
            if(!val.isEmpty()){
            	isAllNull = false;
				break;
            }
        	msg.append(key + "、");
		}
		
		if (isAllNull) {
			throw new AtomException(-16, "[" + msg.substring(0, (msg.length()-1)) + "]不能全为空!",
					FrameworkConstants.ATOM_LVL);
		}
	}

	/**
	 * 关联入参校验（多个入参值情况保持一致，均有值或均为空，否则报错）
	 * @param params
	 * @param keys
     */
	public static void allNullOrNot(Map params, String... keys) {
		if(params != null && keys != null && keys.length > 0) {
			boolean flag = false;
			String val = ObjectUtils.toString(params.get(keys[0]));
			if("".equals(val)) {
				for(int i = 1, len = keys.length; i < len; i++) {
					if(!"".equals(ObjectUtils.toString(params.get(keys[i])))) {
						flag = true;
						break;
					}
				}
			} else {
				for(int i = 1, len = keys.length; i < len; i++) {
					if("".equals(ObjectUtils.toString(params.get(keys[i])))) {
						flag = true;
						break;
					}
				}
			}
			if(flag) {
				throw new AtomException(-10000, "入参字段【" + Arrays.toString(keys)+ "】值不正确，必须均为空或有值", FrameworkConstants.ATOM_LVL);
			}
		}
 	}

	public static void anyNoList(Map params, String... keys) {
		if(params != null && keys != null) {
			StringBuffer errKeys = new StringBuffer();
			boolean flag = true;
			for(int i = 0, len = keys.length; i < len; i++) {
				if(params.get(keys[i]) == null || !(params.get(keys[i]) instanceof List)) {
					flag = false;
					errKeys.append(keys[i]);
				}
			}
			if(!flag) {
				throw new AtomException(-1000000, "字段【" + errKeys.toString() + "】为空或值为非数组集合类型", FrameworkConstants.ATOM_LVL);
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	public static void remainKey(Map map, String... keys) {
		Map<String,Object> srcMap = new HashMap(map);
		map.clear();
		for(String key : keys){
			Object val = srcMap.get(key);
			if(val != null){
				map.put(key, val);	
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	public static void deleteKey(Map map, String...keys) {
	       for(String key : keys){
	    	   if(map.containsKey(key)){
	    		   map.remove(key);
	    	   }
	       }		
		}
}
