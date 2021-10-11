package com.taller.backend.interface_service;

import java.util.List;
import java.util.Optional;

import com.taller.backend.model.Empleado;

public interface IEmpleadoService {
	
	public List<Empleado> listar();
	public Optional<Empleado> listarId(int id);
	public int Save(Empleado e);
	public void delete(int id);
	
}
