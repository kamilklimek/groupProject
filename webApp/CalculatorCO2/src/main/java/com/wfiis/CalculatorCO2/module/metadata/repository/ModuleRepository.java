package com.wfiis.CalculatorCO2.module.metadata.repository;

import com.wfiis.CalculatorCO2.company.metadata.entity.Company;
import com.wfiis.CalculatorCO2.module.metadata.entity.Module;
import com.wfiis.CalculatorCO2.vegetable.metadata.entity.Vegetable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findModulesByOutsourced(Boolean outsourced);
    List<Module> findModulesByCompany(Company company);
    List<Module> findModuleByVegetablesAndCompany(Vegetable vegetables, Company company);
    List<Module> findModuleByVegetablesAndOutsourced(Vegetable vegetables, Boolean outsourced);
}
