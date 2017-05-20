#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
from bs4 import BeautifulSoup
import codecs
import json

# internationalize the month
def transform_month(month):
	if month.lower() == 'jan' or month.lower() == 'jan': return '01'
	if month.lower() == 'fev' or month.lower() == 'feb': return '02'
	if month.lower() == 'mar' or month.lower() == 'mar': return '03'
	if month.lower() == 'abr' or month.lower() == 'apr': return '04'
	if month.lower() == 'mai' or month.lower() == 'may': return '05'
	if month.lower() == 'jun' or month.lower() == 'jun': return '06'
	if month.lower() == 'jul' or month.lower() == 'jul': return '07'
	if month.lower() == 'ago' or month.lower() == 'aug': return '08'
	if month.lower() == 'set' or month.lower() == 'sep': return '09'
	if month.lower() == 'out' or month.lower() == 'oct': return '10'
	if month.lower() == 'nov' or month.lower() == 'nov': return '11'
	if month.lower() == 'dez' or month.lower() == 'dec': return '12'
	return None



# Open the files 
f = codecs.open('Gastos.html', 'r', encoding='utf-8')
content = f.read()
f.close()

saida = codecs.open('gastos.json', 'w', encoding='utf-8')


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

# put every html of gastos inside todosGastosHtml
todosGastosHtml = [[]] * 27
for i in range(2, 25):
	todosGastosHtml[i - 2] = linhas[i].find_all('td')


# populate the arrayGastos with the gastos from the months
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




# Turn info into JSON
jsonObj = dict()

# iterate  over the array of months
for elem in meses:
	year = ('20' + elem[len(elem) - 2:]).encode('utf8')
	month = transform_month(elem[:3]).encode('utf8')
	if not jsonObj.has_key(year):
		jsonObj[year] = {}
	jsonObj[year][month] = {}

# print jsonObj


# put the speding in the json
count = 0
for year in sorted(jsonObj):
	print year
	for month in sorted(jsonObj[year]):
		print month
		jsonObj[year][month]['debts'] = arrayGastos[count]
		count = count + 1



saida.write(json.dumps(jsonObj, ensure_ascii=False, indent=4, sort_keys=True));
saida.close()















