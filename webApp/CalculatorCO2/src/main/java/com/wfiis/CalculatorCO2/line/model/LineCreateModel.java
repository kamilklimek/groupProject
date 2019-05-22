package com.wfiis.CalculatorCO2.line.model;

import com.wfiis.CalculatorCO2.stage.metadata.entity.Stage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LineCreateModel {
    private String name;
    private List<Stage> stages;
}