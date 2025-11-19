'use client';

import Image from 'next/image';
import { useState } from 'react';
import { RiCheckFill, RiPushpin2Fill, RiPushpinLine, RiQrCodeLine, RiShieldUserLine } from 'react-icons/ri';

const StudentVirtualIdCard = ({
  name,
  role,
  organisation,
  idNumber,
  cohort,
  department,
  issueDate,
  validUntil,
  bloodGroup,
  avatarUrl,
  qrCodeUrl,
  verified = false
}) => {
  const [isPinned, setIsPinned] = useState(false);

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div
        className={`relative w-full max-w-lg overflow-hidden rounded-[36px] border border-white/65 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.4)] transition-all duration-500 ease-out ${
          isPinned
            ? 'bg-gradient-to-br from-[#060809] via-[#0f172a] to-[#101827] text-white'
            : 'bg-white text-gray-900'
        }`}
      >
        <figure className="relative h-72 w-full overflow-hidden">
          <Image
            src={avatarUrl}
            alt={name}
            width={400}
            height={400}
            priority
            className={`h-full w-full object-cover transition-transform duration-700 ${
              isPinned ? 'scale-110' : 'scale-100'
            }`}
          />
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isPinned
                ? 'bg-[linear-gradient(180deg,rgba(17,24,39,0.35)_0%,rgba(17,24,39,0.85)_65%,rgba(17,24,39,0.95)_100%)]'
                : ''
            }`}
          />
          <button
            type="button"
            onClick={() => setIsPinned((prev) => !prev)}
            className={`absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border text-base font-semibold transition-all duration-500 ${
              isPinned
                ? 'border-white/20 bg-white/10 text-white shadow-[0_16px_40px_-20px_rgba(255,255,255,0.7)] backdrop-blur'
                : 'border-gray-100 bg-white text-gray-700 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.3)]'
            }`}
            aria-label={isPinned ? 'Unpin card' : 'Pin card'}
          >
            {isPinned ? <RiPushpin2Fill className="text-lg" /> : <RiPushpinLine className="text-lg" />}
          </button>
        </figure>

        <div
          className={`flex flex-col gap-4 px-7 pb-7 pt-6 transition-all duration-500 ${
            isPinned ? 'text-white' : 'text-gray-900'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{name}</h3>
              {verified && (
                <span className="flex items-center justify-center rounded-full bg-emerald-500 px-1.5 py-0.5 text-xs text-white shadow">
                  <RiCheckFill />
                </span>
              )}
            </div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.35em] ${
                isPinned ? 'text-white/70' : 'text-gray-400'
              }`}
            >
              {organisation}
            </p>
            <p className={`text-sm leading-relaxed ${isPinned ? 'text-white/80' : 'text-gray-500'}`}>{role}</p>
          </div>

          {!isPinned ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-3xl bg-gray-50 px-4 py-3 text-gray-600">
                <span className="font-semibold text-gray-700">Intern ID</span>
                <span className="font-mono text-sm tracking-widest text-gray-500">{idNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
                <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                  <p className="font-semibold text-gray-400">Department</p>
                  <p className="mt-1 text-sm text-gray-700">{department}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                  <p className="font-semibold text-gray-400">Cohort</p>
                  <p className="mt-1 text-sm text-gray-700">{cohort}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                  <p className="font-semibold text-gray-400">Issued</p>
                  <p className="mt-1 text-sm text-gray-700">{issueDate}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                  <p className="font-semibold text-gray-400">Valid Till</p>
                  <p className="mt-1 text-sm text-gray-700">{validUntil}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 rounded-3xl border border-white/15 bg-white/5 px-4 py-5 text-sm text-white/85 backdrop-blur">
              <div className="flex items-center gap-3">
                {qrCodeUrl ? (
                  <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                    <Image src={qrCodeUrl} alt="QR Code" width={80} height={80} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
                    <RiQrCodeLine className="text-3xl" />
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Digital Verification</p>
                  <p className="mt-1 text-sm font-semibold text-white">{organisation} Credential Vault</p>
                  <p className="text-xs text-white/50">Scan to verify internship status</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl border border-white/15 bg-white/5 px-3 py-3">
                  <p className="font-semibold uppercase tracking-[0.18em] text-white/60">Blood Group</p>
                  <p className="mt-1 text-sm text-white">{bloodGroup || 'N/A'}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 px-3 py-3">
                  <p className="font-semibold uppercase tracking-[0.18em] text-white/60">ID Status</p>
                  <p className="mt-1 text-sm text-white">Active</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-3 py-3">
                <RiShieldUserLine className="text-lg text-white/70" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Emergency Contact</p>
                  <p className="mt-1 text-sm text-white/80">+91 875 772 8679 • hr@yugayatraretail.com</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsPinned((prev) => !prev)}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-[999px] px-6 py-3 text-sm font-semibold transition-all duration-500 ${
              isPinned
                ? 'bg-white text-gray-900 shadow-[0_24px_40px_-26px_rgba(255,255,255,0.8)]'
                : 'bg-gray-900 text-white hover:bg-black'
            }`}
          >
            {isPinned ? (
              <>Hide Digital Badge</>
            ) : (
              <>Show Digital Badge</>
            )}
          </button>
        </div>
      </div>

      <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Tap follow to toggle style</p>
    </div>
  );
};

export default StudentVirtualIdCard;


