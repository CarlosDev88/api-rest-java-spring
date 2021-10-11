package com.taller.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taller.backend.interface_service.IEmpleadoService;
import com.taller.backend.interfaces.IEmpleado;
import com.taller.backend.model.Empleado;

@Service
public class EmpleadoService implements IEmpleadoService {
	
	@Autowired
	private IEmpleado data;

	@Override
	public List<Empleado> listar() {
		// devuelve una lista de empleados
		return (List<Empleado>) data.findAll();
	}

	@Override
	public Optional<Empleado> listarId(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int Save(Empleado e) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub

	}

}
