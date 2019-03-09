package com.b.calculator.controller;

import com.b.calculator.model.Line;
import com.b.calculator.repository.LineRepository;
import com.b.calculator.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class LineController {

    @Autowired
    LineRepository lineRepository;

    @Autowired
    StageRepository stageRepository;

    @GetMapping("/lines")
    public String lines(Model model, @PathVariable Long id)
    {
        model.addAttribute("line", lineRepository.findById(id).get());
        return "/Line/lines";
    }

    @RequestMapping(value = "/lineSave", method = RequestMethod.POST)
    public String lineSave(
            @ModelAttribute("line") Line line,
            BindingResult result, Model model) {

        if (result.hasErrors()) {
            return "error";
        }
        lineRepository.save(line);

        return "redirect:/lines";
    }

    @GetMapping("/line/edit/{id}")
    public String lineEdit(Model model, @PathVariable Long id)
    {
        model.addAttribute("line", lineRepository.findById(id).get());
        //model.addAttribute("availableStages", stageRepository.???);
        return "/Line/editLine";
    }

    @GetMapping("/line/delete/{id}")
    public String lineDelete(Model model, @PathVariable Long id)
    {
        model.addAttribute("line", lineRepository.findById(id).get());
        return "/Line/deleteLine";
    }


    @GetMapping("/line/delete/confirmed/{id}")
    public String lineDeleteConfirmed(Model model, @PathVariable Long id)
    {
        lineRepository.deleteById(id);
        return "redirect:/lines";
    }
}