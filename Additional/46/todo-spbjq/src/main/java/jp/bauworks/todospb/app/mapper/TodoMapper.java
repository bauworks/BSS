package jp.bauworks.todospb.app.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import jp.bauworks.todospb.app.entity.Todo;


@Mapper
public interface TodoMapper {
    public List<Todo> selectAll();
    public List<Todo> selectComplete();
    public List<Todo> selectIncomplete();
    public void add(Todo todo);
    public void update(Todo todo);
    public void delete();
}