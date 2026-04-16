import Link from "next/link";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";

type SearchParams = Promise<{
	session_id?: string | string[];
}>;

type StripeSession = {
	id: string;
	customer_details?: {
		name?: string | null;
		email?: string | null;
		address?: StripeAddress;
	} | null;
	amount_total?: number | null;
	currency?: string | null;
	subscription?: string | null;
	customer?: string | null;
	payment_status?: string | null;
	created?: number;
};

type StripeAddress = {
	line1?: string | null;
	line2?: string | null;
	city?: string | null;
	state?: string | null;
	postal_code?: string | null;
	country?: string | null;
} | null | undefined;

type StripeLineItem = {
	amount_total?: number | null;
	quantity?: number | null;
	description?: string | null;
	price?: {
		id?: string | null;
		unit_amount?: number | null;
		currency?: string | null;
		recurring?: {
			interval?: string | null;
		} | null;
		product?: {
			name?: string | null;
		} | string | null;
	} | null;
};

type StripeSubscription = {
	id: string;
	status?: string | null;
	current_period_start?: number | null;
	current_period_end?: number | null;
	default_payment_method?:
		| {
				card?: {
					brand?: string | null;
					last4?: string | null;
					exp_month?: number | null;
					exp_year?: number | null;
				} | null;
			}
		| string
		| null;
};

function formatCurrency(amount?: number | null, currency = "usd") {
	if (typeof amount !== "number") {
		return "—";
	}

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
	}).format(amount / 100);
}

function formatDate(timestamp?: number | null) {
	if (!timestamp) {
		return "—";
	}

	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(timestamp * 1000));
}

function formatAddress(address: StripeAddress) {
	if (!address) {
		return "—";
	}

	const parts = [address.line1, address.line2, address.city, address.state, address.postal_code, address.country].filter(Boolean);

	return parts.length > 0 ? parts.join(", ") : "—";
}

async function fetchStripe<T>(path: string): Promise<T | null> {
	const secretKey =
		process.env.STRIPE_SECRET_KEY ??
		process.env.STRIPE_SECRET ??
		process.env.sk_test ??
		"";

	if (!secretKey) {
		return null;
	}

	const response = await fetch(`https://api.stripe.com/v1${path}`, {
		headers: {
			Authorization: `Bearer ${secretKey}`,
		},
		cache: "no-store",
	});

	if (!response.ok) {
		return null;
	}

	return response.json() as Promise<T>;
}

async function getStripeSuccessData(sessionId: string) {
	const [session, lineItems] = await Promise.all([
		fetchStripe<StripeSession>(
			`/checkout/sessions/${sessionId}?expand[]=customer_details`
		),
		fetchStripe<{ data: StripeLineItem[] }>(
			`/checkout/sessions/${sessionId}/line_items?limit=10&expand[]=data.price.product`
		),
	]);

	const subscription =
		session?.subscription && typeof session.subscription === "string"
			? await fetchStripe<StripeSubscription>(
				`/subscriptions/${session.subscription}?expand[]=default_payment_method`
			)
			: null;

	return { session, lineItems, subscription };
}

export default async function SuccessPage({ searchParams }: { searchParams: SearchParams }) {
	const params = await searchParams;
	const rawSessionId = params.session_id;
	const sessionId = Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId;

	if (!sessionId) {
		return (
			<Wrapper className="my-10">
				<div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-950 shadow-sm">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Stripe payment</p>
					<h1 className="mt-3 text-3xl font-semibold">Missing session id</h1>
					<p className="mt-3 max-w-2xl text-base text-amber-900/80">
						The payment completed page needs a valid session id in the query string so the order details can be loaded.
					</p>
					<div className="mt-6">
						<Link
							href="/"
							className="inline-flex items-center justify-center rounded-full bg-amber-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-900"
						>
							Back to home
						</Link>
					</div>
				</div>
			</Wrapper>
		);
	}

	const { session, lineItems, subscription } = await getStripeSuccessData(sessionId);

	if (!session) {
		return (
			<Wrapper className="my-10">
				<div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Stripe payment</p>
					<h1 className="mt-3 text-3xl font-semibold text-stone-950">Payment confirmed</h1>
					<p className="mt-3 max-w-2xl text-base text-stone-600">
						We could not load the session details right now, but your checkout session id was received successfully.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<Link
							href="/"
							className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
						>
							Back to home
						</Link>
					</div>
				</div>
			</Wrapper>
		);
	}

	const primaryLineItem = lineItems?.data?.[0];
	const productName =
		typeof primaryLineItem?.price?.product === "string"
			? primaryLineItem.price.product
			: primaryLineItem?.price?.product?.name ?? primaryLineItem?.description ?? "Subscription plan";
	const currency = session.currency ?? primaryLineItem?.price?.currency ?? "usd";
	const subscriptionStart =
		subscription?.current_period_start ?? session.created ?? null;
	const renewDate = subscription?.current_period_end ?? null;
	const card =
		typeof subscription?.default_payment_method === "object" &&
		subscription.default_payment_method !== null
			? subscription.default_payment_method.card ?? null
			: null;

	return (
		<Wrapper className="my-10">
			<div className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
				<div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-8 py-10 text-white sm:px-10">
					<p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-50/90">Payment successful</p>
					<h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Your subscription is active</h1>
					<p className="mt-4 max-w-3xl text-sm text-emerald-50/90 sm:text-base">
						Thank you for subscribing. Your order has been confirmed and the subscription details are shown below.
					</p>
				</div>

				<div className="grid gap-6 px-8 py-8 lg:grid-cols-3 sm:px-10">
					<section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 lg:col-span-2">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Order details</p>
								<h2 className="mt-2 text-2xl font-semibold text-stone-950">{productName}</h2>
							</div>
							<div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
								{session.payment_status ?? "paid"}
							</div>
						</div>

						<div className="mt-6 grid gap-4 sm:grid-cols-2">
							<div className="rounded-2xl bg-white p-4 shadow-sm">
								<p className="text-sm text-stone-500">Session ID</p>
								<p className="mt-1 break-all text-sm font-medium text-stone-900">{session.id}</p>
							</div>
							<div className="rounded-2xl bg-white p-4 shadow-sm">
								<p className="text-sm text-stone-500">Subscription status</p>
								<p className="mt-1 text-sm font-medium text-stone-900">{subscription?.status ?? "active"}</p>
							</div>
							<div className="rounded-2xl bg-white p-4 shadow-sm">
								<p className="text-sm text-stone-500">Amount paid</p>
								<p className="mt-1 text-sm font-medium text-stone-900">
									{formatCurrency(session.amount_total, currency)}
								</p>
							</div>
							<div className="rounded-2xl bg-white p-4 shadow-sm">
								<p className="text-sm text-stone-500">Billing cycle</p>
								<p className="mt-1 text-sm font-medium text-stone-900">
									{primaryLineItem?.price?.recurring?.interval
										? `Billed ${primaryLineItem.price.recurring.interval}`
										: "Recurring subscription"}
								</p>
							</div>
						</div>

						<div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5">
							<div className="flex items-center justify-between gap-4">
								<h3 className="text-lg font-semibold text-stone-950">Billing info</h3>
								<p className="text-sm text-stone-500">{session.customer_details?.email ?? "Email unavailable"}</p>
							</div>
							<div className="mt-4 grid gap-4 sm:grid-cols-2">
								<div>
									<p className="text-sm text-stone-500">Customer name</p>
									<p className="mt-1 text-sm font-medium text-stone-900">
										{session.customer_details?.name ?? "—"}
									</p>
								</div>
								<div>
									<p className="text-sm text-stone-500">Billing address</p>
									<p className="mt-1 text-sm font-medium text-stone-900">
										{formatAddress(session.customer_details?.address)}
									</p>
								</div>
								<div>
									<p className="text-sm text-stone-500">Card</p>
									<p className="mt-1 text-sm font-medium text-stone-900">
										{card?.brand ? `${card.brand.toUpperCase()} •••• ${card.last4 ?? "—"}` : "Card details unavailable"}
									</p>
								</div>
								<div>
									<p className="text-sm text-stone-500">Expiry</p>
									<p className="mt-1 text-sm font-medium text-stone-900">
										{card?.exp_month && card?.exp_year ? `${String(card.exp_month).padStart(2, "0")}/${card.exp_year}` : "—"}
									</p>
								</div>
							</div>
						</div>
					</section>

					<aside className="space-y-4">
						<div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
							<p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Subscription start date</p>
							<p className="mt-3 text-2xl font-semibold text-stone-950">{formatDate(subscriptionStart)}</p>
						</div>

						<div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
							<p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Renew date</p>
							<p className="mt-3 text-2xl font-semibold text-stone-950">{formatDate(renewDate)}</p>
						</div>

						<div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
							<p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Next step</p>
							<p className="mt-3 text-sm leading-6 text-stone-600">
								You can now access your subscription benefits and manage your account from the home page.
							</p>
							<Link
								href="/"
								className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
							>
								Back to home
							</Link>
						</div>
					</aside>
				</div>
			</div>
		</Wrapper>
	);
}
