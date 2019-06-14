package kr.hs.dgsw.board_back.Controller;

import kr.hs.dgsw.board_back.Domain.User;
import kr.hs.dgsw.board_back.Service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping(value = "/api/user")
    public List findAll() {
        return userService.findAll();
    }

    @GetMapping(value = "/api/user/id")
    public User findById(@Param("id") Long id) {
        return userService.findById(id);
    }

    @PostMapping(value = "/api/user")
    public int addWithHashMap(@RequestBody User user) {
        return userService.addWithHashMap(user);
    }

    @PostMapping(value = "/api/user/login")
    public Long login(@RequestBody User user) {
        return userService.login(user);
    }

    @PutMapping(value = "/api/user")
    public int modify(@RequestBody User user) {
        return userService.modify(user);
    }

    @DeleteMapping(value = "/api/user")
    public int deleteById(@Param("id") Long id) {
        return userService.deleteById(id);
    }
}
