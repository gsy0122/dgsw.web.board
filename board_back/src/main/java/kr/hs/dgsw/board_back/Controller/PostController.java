package kr.hs.dgsw.board_back.Controller;

import kr.hs.dgsw.board_back.Domain.Post;
import kr.hs.dgsw.board_back.Service.PostService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping(value = "/api/post")
    public List findAll() {
        return postService.findAll();
    }

    @GetMapping(value = "/api/post/id")
    public Post findById(@Param("id") Long id) {
        return postService.findById(id);
    }

    @GetMapping(value = "/api/post/userId")
    public List<Post> findByUserId(@Param("userId") Long userId) {
        return postService.findByUserId(userId);
    }

    @PostMapping(value = "/api/post")
    public int addWithHashMap(@RequestBody Post post) {
        return postService.addWithHashMap(post);
    }

    @PutMapping(value = "/api/post")
    public int modify(@RequestBody Post post) {
        return postService.modify(post);
    }

    @DeleteMapping(value = "/api/post")
    public int deleteById(@Param("id") Long id) {
        return postService.deleteById(id);
    }
}
