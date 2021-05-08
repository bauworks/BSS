package jp.bauworks.demo7.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/")
public class SampleController {

    @RequestMapping("/result")
    public String page(String inputStr, Model model) {      
        model.addAttribute("tag", "次の文字列が入力されました。");
        model.addAttribute("resultStr", inputStr);
        return "index";
    }

}
