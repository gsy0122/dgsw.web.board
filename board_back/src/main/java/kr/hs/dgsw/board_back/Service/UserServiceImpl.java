package kr.hs.dgsw.board_back.Service;

import kr.hs.dgsw.board_back.Domain.User;
import kr.hs.dgsw.board_back.Domain.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;

    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }

    @Override
    public int deleteById(Long id) {
        return userMapper.deleteById(id);
    }

    @Override
    public Long add(User user) {
        return userMapper.add(user);
    }

    @Override
    public int modify(User user) {
        return userMapper.modify(user);
    }

    @Override
    public User findById(Long id) {
        System.out.println(id);
        return userMapper.findById(id);
    }

    @Override
    public int addWithHashMap(User user) {
        HashMap map = new HashMap<String, Object>();
        map.put("account", user.getAccount());
        map.put("password", user.getPassword());
        map.put("username", user.getUsername());
        map.put("email", user.getEmail());
        return userMapper.addWithHashMap(map);
    }

    @Override
    public Long login(User user) {
        return userMapper.login(user);
    }
}
