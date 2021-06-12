package jp.bauworks.todospb.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import jp.bauworks.todospb.app.entity.Todo;
import jp.bauworks.todospb.app.mapper.TodoMapper;

@Controller
public class TodoController {
    @Autowired
    TodoMapper todoMapper;

    @RequestMapping(value="/")
    public String index(Model model) {
        //List<Todo> list = todoMapper.selectAll();
        List<Todo> list = todoMapper.selectIncomplete();
        List<Todo> doneList = todoMapper.selectComplete();
        model.addAttribute("todos",list);
        model.addAttribute("doneTodos",doneList);
        return "index";
    }


    @RequestMapping(value="/add")
    @ResponseBody
    public Todo add(Todo todo) {
        todoMapper.add(todo);
        return todo;
    }


    @RequestMapping(value="/update")
    @ResponseBody
    public String update(Todo todo) {
        String succes = "false";
        try {
            todoMapper.update(todo);
            succes = "true";
        } catch(Exception e) {
            succes = "false";
        }
        return succes;        
    }


    @RequestMapping(value="/delete")
    @ResponseBody
    public void delete() {
        todoMapper.delete();
    }


    //----------------------------------------------
    // API
    //----------------------------------------------    
    @RequestMapping(value="/api/selectall")
    @CrossOrigin(origins = "*")
    @ResponseBody
    public List<Todo> apiSelectall(Model model) {
        List<Todo> list = todoMapper.selectAll();
        return list;
    }

    
    @RequestMapping(value="/api/add")
    @CrossOrigin(origins = "*")
    @ResponseBody
    public Todo apiAdd(@RequestBody Todo todo) {
        todoMapper.add(todo);
        return todo;
    }

    
    @RequestMapping(value="/api/update")
    @CrossOrigin(origins = "*")
    @ResponseBody
    public String apiUpdate(@RequestBody Todo todo) {
        String succes = "false";
        try {
            todoMapper.update(todo);
            succes = "true";
        } catch(Exception e) {
            succes = "false";
        }
        return succes;        
    }

    
    @RequestMapping(value="/api/delete")
    @CrossOrigin(origins = "*")
    @ResponseBody
    public void apiDelete() {
        todoMapper.delete();
    }
	
}
