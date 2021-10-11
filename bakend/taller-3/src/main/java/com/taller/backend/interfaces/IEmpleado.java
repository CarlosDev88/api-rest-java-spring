package com.taller.backend.interfaces;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.taller.backend.model.Empleado;

@Repository
public interface IEmpleado extends CrudRepository<Empleado, Integer>{

}
