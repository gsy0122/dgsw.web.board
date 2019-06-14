package kr.hs.dgsw.board_back.Domain;

import org.apache.ibatis.annotations.*;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface UserMapper {
    List<User> findAll();
    int deleteById(@Param("id") Long id);
    Long add(User user);
    int modify(User user);
    User findById(@Param("id") Long id);
    int addWithHashMap(HashMap<String, Object> map);
    Long login(User user);
}
