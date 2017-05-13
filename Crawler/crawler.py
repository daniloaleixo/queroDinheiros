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


gastos = linhas[2].find_all('td')
indiceMes = 0
for i in range(1, len(gastos) - 1, 3):
	desc = gastos[i].string
	amount = gastos[i + 1].string
	tag = gastos[i + 2].string
	if desc != None and amount != None and tag != None and indiceMes < len(meses):
		novoGasto = {}
		novoGasto['description'] = desc
		novoGasto['amount'] = amount
		novoGasto['tag'] = tag
		arrayGastos[indiceMes].append(novoGasto)
		indiceMes = indiceMes + 1










