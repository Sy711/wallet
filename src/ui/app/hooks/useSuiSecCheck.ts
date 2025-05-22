// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { type Transaction } from '@mysten/sui/transactions';
import { useQuery } from '@tanstack/react-query';

import { useAccountByAddress } from './useAccountByAddress';
import { useSigner } from './useSigner';

export function useSuiSecCheck(sender: string | undefined, transactionBlock: Transaction | null) {
	const { data: account } = useAccountByAddress(sender);
	const signer = useSigner(account || null);

	return useQuery({
		queryKey: ['suiSecCheck', transactionBlock?.serialize(), sender, transactionBlock, signer],
		queryFn: async () => {
			if (!transactionBlock) throw new Error('No transaction block provided');
			if (!sender) throw new Error('No sender address provided');

			try {
				console.log('[SuiSec] Request payload:', {
					transaction: transactionBlock.getData(),
					sender,
					website: window.location.origin,
				});

				const response = await fetch('https://api.suisec.tech/dryRunPlus', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						transaction: JSON.stringify(transactionBlock.getData()),
						website: window.location.origin,
						sender: sender,
					}),
				});
				console.log('[SuiSec] Response status:', response.status);
				const responseText = await response.text();
				console.log('[SuiSec] Response body:', responseText);

				const securityCheck = JSON.parse(responseText);
				console.log('[SuiSec] Parsed response:', securityCheck);

				// 处理对象不存在的情况
				if (securityCheck.Error) {
					return {
						pass: false,
						msg: `对象校验失败: ${securityCheck.Error.message}`,
						dryRun: null,
						error: securityCheck.Error, // 新增错误字段
					};
				}

				return {
					pass: securityCheck.pass,
					msg: securityCheck.message || securityCheck.msg || '安全检查未返回具体信息',
					dryRun: securityCheck.dryRun,
				};
			} catch (e) {
				console.error('[SuiSec] API request failed:', e);
				throw e;
			}
		},
		enabled: !!transactionBlock && !!signer && !!sender,
		retry: 1,
	});
}
