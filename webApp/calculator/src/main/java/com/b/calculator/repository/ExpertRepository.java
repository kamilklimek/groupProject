package com.b.calculator.repository;

import com.b.calculator.model.Expert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpertRepository extends JpaRepository<Expert, Long> {
}