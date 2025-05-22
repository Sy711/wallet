// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// import { Transaction } from '@mysten/sui';
import { UserApproveContainer } from '_components/user-approve-container';
import { useAppDispatch, useSuiSecCheck } from '_hooks';
import { type TransactionApprovalRequest } from '_payloads/transactions/ApprovalRequest';
import { respondToTransactionRequest } from '_redux/slices/transaction-requests';
import { ampli } from '_src/shared/analytics/ampli';
import { useAccountByAddress } from '_src/ui/app/hooks/useAccountByAddress';
import { useQredoTransaction } from '_src/ui/app/hooks/useQredoTransaction';
import { useRecognizedPackages } from '_src/ui/app/hooks/useRecognizedPackages';
import { useSigner } from '_src/ui/app/hooks/useSigner';
import { PageMainLayoutTitle } from '_src/ui/app/shared/page-main-layout/PageMainLayoutTitle';
import { TransactionSummary } from '_src/ui/app/shared/transaction-summary';
import { Switch } from '@headlessui/react';
import { useTransactionSummary } from '@mysten/core';
import { Transaction } from '@mysten/sui/transactions';
import cn from 'clsx';
import { useMemo, useState } from 'react';

// 确认使用的网络配置
export type TransactionRequestProps = {
	txRequest: TransactionApprovalRequest;
};

// Some applications require *a lot* of transactions to interact with, and this
// eats up our analytics event quota. As a short-term solution so we don't have
// to stop tracking this event entirely, we'll just manually exclude application
// origins with this list
const appOriginsToExcludeFromAnalytics = ['https://sui8192.ethoswallet.xyz'];

export function TransactionRequest({ txRequest }: TransactionRequestProps) {
	const addressForTransaction = txRequest.tx.account;
	const { data: accountForTransaction } = useAccountByAddress(addressForTransaction);
	const signer = useSigner(accountForTransaction);
	const [bypassSecurityCheck, setBypassSecurityCheck] = useState(false);
	const dispatch = useAppDispatch();
	const transaction = useMemo(() => {
		const tx = Transaction.from(txRequest.tx.data);
		if (addressForTransaction) {
			tx.setSenderIfNotSet(addressForTransaction);
		}
		return tx;
	}, [txRequest.tx.data, addressForTransaction]);
	// const { isPending } = useTransactionData(addressForTransaction, transaction);
	const {
		data: securityCheckData,
		isError: isDryRunError,
		isPending: isDryRunLoading,
	} = useSuiSecCheck(addressForTransaction, transaction);
	console.log('securityCheckData', securityCheckData);

	const recognizedPackagesList = useRecognizedPackages();

	// 使用 securityCheckData 的 dryRun 结果
	const summary = useTransactionSummary({
		transaction: securityCheckData?.dryRun,
		currentAddress: addressForTransaction,
		recognizedPackagesList,
	});
	const { clientIdentifier, notificationModal } = useQredoTransaction(true);
	if (!signer) {
		return null;
	}
	return (
		<>
			<UserApproveContainer
				origin={txRequest.origin}
				originFavIcon={txRequest.originFavIcon}
				approveTitle="Approve"
				rejectTitle="Reject"
				approveDisabled={!bypassSecurityCheck && !securityCheckData?.pass}
				approveButtonClassName={cn(
					// 删除所有悬停状态
					securityCheckData?.pass && ['[&]:bg-hero-dark [&]:text-white'],
					!securityCheckData?.pass && bypassSecurityCheck && ['[&]:!bg-red-600 [&]:!text-white'],
					!bypassSecurityCheck &&
						!securityCheckData?.pass && [
							'[&]:bg-gray-400 [&]:text-gray-700 [&]:cursor-not-allowed',
						],
				)}
				rejectButtonClassName={cn(
					// 删除悬停状态
					securityCheckData?.pass ? '!bg-red-600 !text-white' : '!bg-hero-dark !text-white',
				)}
				onSubmit={async (approved: boolean) => {
					if (isDryRunLoading) return;
					await dispatch(
						respondToTransactionRequest({
							approved,
							txRequestID: txRequest.id,
							signer,
							clientIdentifier,
						}),
					);
					if (!appOriginsToExcludeFromAnalytics.includes(txRequest.origin)) {
						ampli.respondedToTransactionRequest({
							applicationUrl: txRequest.origin,
							approvedTransaction: approved,
							receivedFailureWarning: false,
							type: txRequest.tx.justSign ? 'sign' : 'sign-and-execute',
						});
					}
				}}
				address={addressForTransaction}
				approveLoading={isDryRunLoading}
				checkAccountLock
			>
				<PageMainLayoutTitle title="Approve Transaction" />
				<div className="flex flex-col">
					{securityCheckData?.pass ? (
						<div className="flex flex-col gap-4">
							<TransactionSummary
								isDryRun
								isLoading={isDryRunLoading}
								isError={isDryRunError}
								showGasSummary={false}
								summary={summary}
							/>
						</div>
					) : (
						<div className="mt-4 mb-4 flex flex-col gap-4 p-4 bg-gradient-to-br from-red-100 to-red-200 rounded-lg shadow-lg border border-red-300">
							<div className="flex items-start gap-3 w-full">
								<div className="flex-1 min-w-0">
									{' '}
									{/* 新增 min-w-0 解决 flex 布局下的溢出问题 */}
									<h3 className="text-red-700 font-bold text-lg mb-1">⚠️ Security Risk Warning</h3>
									<div className="max-w-full overflow-hidden">
										{' '}
										{/* 新增宽度约束容器 */}
										<p className="text-red-600 text-lg mb-4 break-words whitespace-pre-wrap break-all">
											{securityCheckData?.msg || 'Loading'}
										</p>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-3 pt-4 pb-2 px-2 border-t border-red-200">
								{' '}
								{/* 修改内边距 */}
								<Switch
									checked={bypassSecurityCheck}
									onChange={setBypassSecurityCheck}
									className={`${
										bypassSecurityCheck ? 'bg-hero-dark' : 'bg-gray-300'
									} relative inline-flex h-6 w-16  items-center rounded-full transition-colors`}
								>
									<span
										className={`${
											bypassSecurityCheck ? 'translate-x-5' : 'translate-x-0'
										} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
									/>
								</Switch>
								<span
									className={`text-sm 
										' font-medium'
									}`}
								>
									I understand the risks and continue the operation
								</span>
							</div>
						</div>
					)}
				</div>
			</UserApproveContainer>
			{notificationModal}
		</>
	);
}
