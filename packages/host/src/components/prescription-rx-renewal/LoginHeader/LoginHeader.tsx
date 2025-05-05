import Box from '@mui/material/Box'
import React from 'react'
import style from "./LoginHeader.module.scss"
import Image from 'next/image'
import { ImageUrlConstants } from '@/constants/image.url.constants'
import Typography from '@mui/material/Typography'
import { RX_RENEWAL_CONSTANT } from '@/constants/RxRenewal.constants'

const LoginHeader = () => {
    return (
        <Box className={style.headerWrapper}>
            <div className={style.loginHeaderContainer}>
                <Box className={style.firstImage}>
                    <Image
                        alt="Prescription Description"
                        className={style.image}
                        src={ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG
                            .LOGIN_HEADER_LEFT}
                        width={218}
                        height={134}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="h2"
                        className={style.loginHeaderHeading}
                    >
                        {RX_RENEWAL_CONSTANT.LOGIN_HEADER_HEADING}
                    </Typography>
                    <Typography variant="h6" className={style.loginHeaderText}>
                        {RX_RENEWAL_CONSTANT.PLEASE_TEXT} <span className={style.boldText}>{RX_RENEWAL_CONSTANT.SIGN_IN_TEXT}</span> {RX_RENEWAL_CONSTANT.OR_TEXT} <span className={style.boldText}>{RX_RENEWAL_CONSTANT.CREATE_TEXT}</span> {RX_RENEWAL_CONSTANT.GET_STARTED_TEXT}
                    </Typography>
                </Box>
                <Box className={style.firstImage}>
                    <Image
                        alt="Prescription Description"
                        className={style.image}
                        src={ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG
                            .LOGIN_HEADER_RIGHT}
                        width={218}
                        height={134}
                    />
                </Box>
            </div>
        </Box>
    )
}

export default LoginHeader