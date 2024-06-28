import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Select } from '../select/Select';
import { Separator } from '../separator';
import { Text } from '../text';

import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, ArticleStateType, } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	appState: ArticleStateType;
	setAppState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ appState, setAppState }: Props) => {
	const [open, setOpen] = useState(false);

	const [formState, setFormState] = useState({
		fontFamilyOption: appState.fontFamilyOption,
		fontColor: appState.fontColor,
		backgroundColor: appState.backgroundColor,
		contentWidth: appState.contentWidth,
		fontSizeOption: appState.fontSizeOption,
	});

	const ref = useRef(null);

	const changeOpenStatus = () => {
		setOpen(!open);
	};

	const resetForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(appState);
	};

	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(formState);
	};

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', (event) => {
				handleClickOutside(event);
			});
		}
		return () => {
			document.removeEventListener('mousedown', (event) => {
				handleClickOutside(event);
			});
		};
	}, [open]);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			ref.current &&
			!(ref.current as HTMLDivElement).contains(event.target as Node | null)
		) {
			setOpen(false);
		}
	};

	return (
		<>
			<ArrowButton openStatus={changeOpenStatus} open={open} />
			<aside
				ref={ref}
				className={
					styles.container + (open ? ` ${styles.container_open}` : '')
				}>
				<form onSubmit={submitForm} onReset={resetForm} className={styles.form}>
					<Text as='h2' size={31} weight={800}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
					/>
					<RadioGroup
						title='размер шрифта'
						name='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
