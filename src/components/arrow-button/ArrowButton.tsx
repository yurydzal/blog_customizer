import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type Props = {
	openStatus?: () => void;
	open?: boolean;
};

export const ArrowButton = ({ openStatus, open }: Props) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container + (open ? ` ${styles.container_open}` : '')}
			onClick={openStatus}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={styles.arrow + (open ? ` ${styles.arrow_open}` : '')}
			/>
		</div>
	);
};
