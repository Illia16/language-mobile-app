const mt10 = {
    marginTop: 10,
}

const w75 = {
    width: '75%',
}

export const containerCss = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
}

export const buttonCss = {
	default: {
        ...mt10,
        ...w75,
		backgroundColor: 'blue',
	},
	disabled: {
        ...mt10,
        ...w75,
		backgroundColor: 'grey',
	},
}


