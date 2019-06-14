package kr.hs.dgsw.board_back.Service;

import kr.hs.dgsw.board_back.Domain.Post;
import kr.hs.dgsw.board_back.Domain.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostMapper postMapper;

    @Override
    public List<Post> findAll() {
        return postMapper.findAll();
    }

    @Override
    public int deleteById(Long id) {
        return postMapper.deleteById(id);
    }

    @Override
    public Long add(Post post) {
        return postMapper.add(post);
    }

    @Override
    public int modify(Post post) {
        return postMapper.modify(post);
    }

    @Override
    public Post findById(Long id) {
        return postMapper.findById(id);
    }

    @Override
    public List<Post> findByUserId(Long userId) {
        return postMapper.findByUserId(userId);
    }

    @Override
    public int addWithHashMap(Post post) {
        HashMap map = new HashMap<String, Object>();
        map.put("userId", post.getUserId());
        map.put("title", post.getTitle());
        map.put("content", post.getContent());
        return postMapper.addWithHashMap(map);
    }
}
