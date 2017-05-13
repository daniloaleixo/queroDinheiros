#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
from bs4 import BeautifulSoup
import codecs

f = codecs.open('Gastos.html', 'r', encoding='utf-8')
content = f.read()
f.close()

saida = codecs.open('gastos.json', 'w', encoding='utf-8')

# print content

# parse HTML
soup = BeautifulSoup(content, 'html.parser')
# print(soup.prettify())

tbody = soup.table.tbody

linhas = tbody.find_all('tr')

# Linha com os meses
mesesLinha = linhas[0].find_all('td')


meses = []

# MESES
# exclude first line
for i in range(1, len(mesesLinha)- 1):
	mes = mesesLinha[i].string
	if mes != None:
		meses.append(mesesLinha[i].string)


arrayGastos = [[]] * len(meses)


todosGastosHtml = [[]] * 27
for i in range(2, 25):
	todosGastosHtml[i - 2] = linhas[i].find_all('td')


indiceMes = 0
for j in range(0, len(meses)):
	
	gastoMes = []
	primeira_linha_tem_o_debito = 1

	for i in range(0, 27):
		novoGasto = {}
		if len(todosGastosHtml[i]) > 0:
			desc = todosGastosHtml[i][(j * 3) + primeira_linha_tem_o_debito].string
			amount = todosGastosHtml[i][(j * 3) + 1 + primeira_linha_tem_o_debito].string
			tag = todosGastosHtml[i][(j * 3) + 2 + primeira_linha_tem_o_debito].string
			if desc != None and amount != None and tag != None:
				novoGasto['description'] = desc
				novoGasto['amount'] = amount
				novoGasto['tag'] = tag
				gastoMes.append(novoGasto)

		if i > 0: primeira_linha_tem_o_debito = 0

	arrayGastos[indiceMes] = gastoMes
	indiceMes = indiceMes + 1


# print 'rsultado final'
# print gastoMes
print meses[0], arrayGastos[0]
print meses[len(meses)- 3], arrayGastos[len(meses) - 3]
print meses[len(meses)- 1], arrayGastos[len(meses) - 1]











